#!/usr/bin/env node
//
// Convert a finished live feed into an article, then reset the feed for the
// next trip. See scripts/README.md for the full walkthrough.
//
//   node scripts/liveToArticle.mjs build --trip 2603ValleeNoir --title "Vallee Noir"
//   node scripts/liveToArticle.mjs reset --trip 2603ValleeNoir
//
// Everything is copied VERBATIM - same filenames, same posts.json bytes - so the
// trip folder in the content bucket mirrors the live bucket's own layout:
//
//   <trip>/posts/posts.json      <- copy of live posts/posts.json
//   <trip>/images/<name>.jpg     <- copies of live images/<name>.jpg
//
// That makes an archived trip a drop-in replacement for the live bucket root:
// one renderer reads either, given a different base URL. No filename or image
// reference is ever rewritten.
//
// `build` only ever copies. `reset` is the one destructive step, and it moves
// (never deletes) originals into archive/<trip>/ after proving every copy is
// intact.
//
// Uses the aws CLI (no npm dependencies) so it needs a valid session:
//   aws login
//

import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const POSTS_KEY = "posts/posts.json";
const IMAGE_PREFIX = "images/";
const NO_CACHE = "no-cache, no-store, must-revalidate";
const THUMBNAIL_PREFIX = "articleThumbnails";

// ---------------------------------------------------------------- args

const parseArgs = argv => {
  const mode = argv[0];
  if (!["build", "reset"].includes(mode)) {
    die(`Usage: node scripts/liveToArticle.mjs <build|reset> --trip <slug> [options]

  build   copy the feed's images and text into the content bucket (safe)
  reset   archive the live feed and empty it (destructive)

See scripts/README.md for all options.`);
  }

  const flags = {};
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) die(`Unexpected argument: ${arg}`);
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      flags[key] = true;
    } else {
      flags[key] = next;
      i++;
    }
  }
  return { mode, flags };
};

const { mode, flags } = parseArgs(process.argv.slice(2));

const DRY_RUN = Boolean(flags["dry-run"]);
const TRIP = flags.trip;
if (!TRIP) die("--trip is required (e.g. --trip 2603ValleeNoir)");

// ---------------------------------------------------------------- helpers

function die(message) {
  console.error(`\n${message}\n`);
  process.exit(1);
}

const log = message => console.log(message);
const step = message => console.log(`\n== ${message}`);

const aws = (args, { input, allowFail = false } = {}) => {
  const argv = flags.profile ? ["--profile", flags.profile, ...args] : args;
  try {
    return execFileSync("aws", argv, {
      input,
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 64,
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (err) {
    if (allowFail) return null;
    const detail = (err.stderr || err.stdout || err.message).toString().trim();
    die(`aws ${argv.join(" ")}\n\n${detail}`);
  }
};

// Writes are routed through here so --dry-run covers every mutation.
const awsWrite = (args, opts) => {
  if (DRY_RUN) {
    log(`  [dry-run] aws ${args.join(" ")}`);
    return null;
  }
  return aws(args, opts);
};

// ------------------------------------------------- integrity verification

// One list call per prefix beats a head-object per object: Key -> {size, etag}.
const listObjects = (bucket, prefix) => {
  const raw = aws([
    "s3api", "list-objects-v2",
    "--bucket", bucket,
    "--prefix", prefix,
    "--output", "json",
  ]);
  if (!raw || !raw.trim()) return new Map();
  const contents = JSON.parse(raw).Contents || [];
  return new Map(
    contents.map(o => [o.Key, { size: o.Size, etag: o.ETag.replace(/"/g, "") }])
  );
};

const md5File = filePath =>
  crypto.createHash("md5").update(fs.readFileSync(filePath)).digest("hex");

// A multipart upload's ETag is a digest-of-digests with a "-<parts>" suffix, so
// it can't be compared to a plain file MD5. Size still can be.
const isPlainMd5 = etag => Boolean(etag) && !etag.includes("-");

// Compares a local file against a remote object. Returns null when they match,
// or a human-readable reason when they don't.
const compareToRemote = (localPath, remote, label) => {
  if (!remote) return `${label} is MISSING`;
  const size = fs.statSync(localPath).size;
  if (remote.size !== size) {
    return `${label} size mismatch: local ${size} vs remote ${remote.size}`;
  }
  if (isPlainMd5(remote.etag)) {
    const local = md5File(localPath);
    if (local !== remote.etag) {
      return `${label} checksum mismatch: local ${local} vs remote ${remote.etag}`;
    }
  }
  return null;
};

const readEnvFile = () => {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(envPath, "utf8")
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#") && line.includes("="))
      .map(line => {
        const at = line.indexOf("=");
        return [line.slice(0, at).trim(), line.slice(at + 1).trim()];
      })
  );
};

const workDir = () => {
  const dir = path.join(ROOT, ".live-export", TRIP);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};

// ---------------------------------------------------------------- discovery

// No bucket name is written down in this repo - only the CloudFront URLs, which
// are public anyway. Each bucket is resolved at runtime from its distribution's
// S3 origin, so the names stay out of version control.
const resolveBucket = ({ label, cdnEnvVar, override }) => {
  if (flags[override]) {
    return { bucket: flags[override], distributionId: flags.distribution };
  }

  const cdnUrl = readEnvFile()[cdnEnvVar];
  if (!cdnUrl) die(`No ${cdnEnvVar} in .env - pass --${override} explicitly.`);
  const host = new URL(cdnUrl).host;

  step(`Resolving ${label} from CloudFront (${host})`);
  const raw = aws(["cloudfront", "list-distributions", "--output", "json"], { allowFail: true });
  if (!raw) die(`Could not list CloudFront distributions - pass --${override} explicitly.`);

  const items = JSON.parse(raw).DistributionList?.Items || [];
  const distribution = items.find(d => d.DomainName === host);
  if (!distribution) die(`No CloudFront distribution with domain ${host} - pass --${override} explicitly.`);

  const origin = (distribution.Origins?.Items || []).find(o => o.DomainName.includes(".s3"));
  if (!origin) die(`Distribution ${distribution.Id} has no S3 origin - pass --${override} explicitly.`);

  const bucket = origin.DomainName.replace(/\.s3[.-][^/]*amazonaws\.com$/, "");
  log(`  ${label}:  ${bucket}`);
  log(`  distribution: ${distribution.Id}`);
  return { bucket, distributionId: flags.distribution || distribution.Id };
};

const resolveLiveBucket = () => {
  if (DRY_RUN && flags["posts-file"] && !flags["live-bucket"]) {
    return { bucket: "<dry-run>", distributionId: null };
  }
  return resolveBucket({
    label: "live bucket",
    cdnEnvVar: "REACT_APP_LIVE_CDN_URL",
    override: "live-bucket",
  });
};

const resolveContentBucket = () => {
  if (DRY_RUN && flags["posts-file"] && !flags["content-bucket"]) return "<dry-run>";
  return resolveBucket({
    label: "content bucket",
    cdnEnvVar: "REACT_APP_CDN_URL",
    override: "content-bucket",
  }).bucket;
};

// Returns { posts, localPath } - posts newest-first, exactly as the lambda
// wrote them, plus the untouched bytes on disk for a verbatim re-upload.
const fetchPosts = bucket => {
  const localPath = flags["posts-file"]
    ? path.resolve(flags["posts-file"])
    : path.join(workDir(), "posts.raw.json");

  if (flags["posts-file"]) {
    step(`Reading ${path.relative(ROOT, localPath)}`);
  } else {
    step(`Reading s3://${bucket}/${POSTS_KEY}`);
    aws(["s3api", "get-object", "--bucket", bucket, "--key", POSTS_KEY, localPath, "--output", "json"]);
  }

  const posts = JSON.parse(fs.readFileSync(localPath, "utf8"));
  if (!Array.isArray(posts)) die(`${POSTS_KEY} is not an array.`);
  log(`  ${posts.length} post(s)`);
  return { posts, localPath };
};

// ---------------------------------------------------------------- naming

const pascalCase = text =>
  text
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join("");

// Existing articles use dd.mm.yy.
const formatDate = ms => {
  const d = new Date(ms);
  const pad = n => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`;
};

// ---------------------------------------------------------------- build

const buildArticle = () => {
  const title = flags.title;
  if (!title) die('--title is required for build (e.g. --title "Vallee Noir")');

  const { bucket: liveBucket } = resolveLiveBucket();
  const contentBucket = resolveContentBucket();
  const folder = flags.folder || TRIP;
  const route = flags.route || `/${pascalCase(title)}`;
  const component = flags.component || `${pascalCase(title)}Screen`;

  const { posts, localPath: postsPath } = fetchPosts(liveBucket);
  if (!posts.length) die("The live feed is empty - nothing to convert.");

  // posts.json is newest-first; the trip ran oldest-first.
  const chronological = posts.slice().reverse();
  const date = flags.date || formatDate(chronological[0].createdAt);
  const imageNames = chronological.flatMap(post => post.images || []);

  if (!flags["no-copy"]) {
    copyFeed({ imageNames, postsPath, liveBucket, contentBucket, folder });
  } else {
    step("Skipping the S3 copy (--no-copy)");
  }

  writeArticleFile({ folder, component, posts: posts.length });
  if (!flags["no-patch"]) {
    patchApp({ component, route });
    patchArticlesScreen({ title, date, route, blurb: flags.blurb || "" });
  }

  const cdn = readEnvFile().REACT_APP_CDN_URL;
  step("Done");
  log(`  article:  src/screens/articles/${TRIP}.jsx`);
  log(`  route:    ${route}`);
  log(`  feed:     ${cdn}/${folder}/posts/posts.json`);
  log(`
Next:
  1. npm start  and check ${route}
  2. Fill in the blurb on the /Articles card if you left it blank.
  3. When you're happy:  node scripts/liveToArticle.mjs reset --trip ${TRIP}`);
};

// Copies the feed into the content bucket under <folder>/, mirroring the live
// bucket's layout with every filename left alone. Nothing is ever removed from
// the live bucket here - see resetFeed.
const copyFeed = ({ imageNames, postsPath, liveBucket, contentBucket, folder }) => {
  const imagesDir = path.join(workDir(), "images");
  fs.mkdirSync(imagesDir, { recursive: true });

  const liveIndex = DRY_RUN ? new Map() : listObjects(liveBucket, IMAGE_PREFIX);

  step(`Downloading ${imageNames.length} image(s) from s3://${liveBucket}/${IMAGE_PREFIX}`);
  for (const name of imageNames) {
    const target = path.join(imagesDir, name);
    if (DRY_RUN) {
      log(`  [dry-run] ${name}`);
      continue;
    }
    const cached = fs.existsSync(target);
    if (!cached) {
      aws(["s3", "cp", `s3://${liveBucket}/${IMAGE_PREFIX}${name}`, target, "--only-show-errors"]);
    }
    // Hop 1: the local copy must match the live original byte for byte.
    const problem = compareToRemote(target, liveIndex.get(`${IMAGE_PREFIX}${name}`), "live original");
    if (problem) die(`Download of ${name} failed verification.\n  ${problem}`);
    log(`  ${cached ? "cached " : "got    "} ${name}  (verified)`);
  }

  step(`Copying images to s3://${contentBucket}/${folder}/${IMAGE_PREFIX}`);
  awsWrite([
    "s3", "sync", imagesDir, `s3://${contentBucket}/${folder}/${IMAGE_PREFIX}`,
    "--content-type", "image/jpeg",
    "--only-show-errors",
  ]);

  step(`Copying feed text to s3://${contentBucket}/${folder}/${POSTS_KEY} (verbatim)`);
  awsWrite([
    "s3", "cp", postsPath, `s3://${contentBucket}/${folder}/${POSTS_KEY}`,
    "--content-type", "application/json",
    "--only-show-errors",
  ]);

  // The /Articles preview card needs articleThumbnails/<trip>.jpg.
  const thumbIndex = Number(flags.thumbnail || 1);
  const thumbName = imageNames[thumbIndex - 1];
  if (imageNames.length && !thumbName) {
    die(`--thumbnail ${thumbIndex} is out of range (1..${imageNames.length}).`);
  }
  if (thumbName) {
    step(`Copying preview thumbnail to s3://${contentBucket}/${THUMBNAIL_PREFIX}/${TRIP}.jpg`);
    awsWrite([
      "s3", "cp", path.join(imagesDir, thumbName),
      `s3://${contentBucket}/${THUMBNAIL_PREFIX}/${TRIP}.jpg`,
      "--content-type", "image/jpeg",
      "--only-show-errors",
    ]);
  }

  // Hop 2: every copied object must match the verified local copy.
  verifyCopies({ imageNames, imagesDir, postsPath, contentBucket, folder, thumbName });
  writeManifest({ imageNames, thumbName, liveBucket, contentBucket, folder, imagesDir, postsPath });
};

// Re-reads the content bucket and checks every object landed intact. Dies on
// the first discrepancy so no later step can act on a bad copy.
const verifyCopies = ({ imageNames, imagesDir, postsPath, contentBucket, folder, thumbName }) => {
  step(`Verifying ${imageNames.length + 1} object(s) in s3://${contentBucket}/${folder}/`);
  if (DRY_RUN) {
    log("  [dry-run] skipped");
    return;
  }

  const index = listObjects(contentBucket, `${folder}/`);
  const problems = [];

  for (const name of imageNames) {
    const key = `${folder}/${IMAGE_PREFIX}${name}`;
    const problem = compareToRemote(path.join(imagesDir, name), index.get(key), key);
    if (problem) problems.push(problem);
  }

  // The feed text matters as much as the images.
  const postsCopyKey = `${folder}/${POSTS_KEY}`;
  const postsProblem = compareToRemote(postsPath, index.get(postsCopyKey), postsCopyKey);
  if (postsProblem) problems.push(postsProblem);

  if (thumbName) {
    const thumbKey = `${THUMBNAIL_PREFIX}/${TRIP}.jpg`;
    const problem = compareToRemote(
      path.join(imagesDir, thumbName),
      listObjects(contentBucket, thumbKey).get(thumbKey),
      thumbKey
    );
    if (problem) problems.push(problem);
  }

  if (problems.length) {
    die(`${problems.length} object(s) failed verification - nothing has been removed from the live bucket:\n  ${problems.join("\n  ")}`);
  }
  log(`  all ${imageNames.length + 1 + (thumbName ? 1 : 0)} object(s) verified (size + checksum)`);
};

// Recorded so `reset` can prove each original has a verified copy before it
// moves anything.
const writeManifest = ({ imageNames, thumbName, liveBucket, contentBucket, folder, imagesDir, postsPath }) => {
  if (DRY_RUN) return;
  const entry = (source, copiedTo, localFile) => ({
    source,
    copiedTo,
    size: fs.statSync(localFile).size,
    md5: md5File(localFile),
  });

  const manifest = {
    trip: TRIP,
    liveBucket,
    contentBucket,
    folder,
    thumbnail: thumbName || null,
    verified: [
      entry(POSTS_KEY, `${folder}/${POSTS_KEY}`, postsPath),
      ...imageNames.map(name =>
        entry(`${IMAGE_PREFIX}${name}`, `${folder}/${IMAGE_PREFIX}${name}`, path.join(imagesDir, name))
      ),
    ],
  };
  fs.writeFileSync(path.join(workDir(), "manifest.json"), JSON.stringify(manifest, null, 2));
  log(`  manifest written to .live-export/${TRIP}/manifest.json`);
};

// ---------------------------------------------------------------- codegen

// The article is a thin wrapper around the very same PostsFeed component that
// renders /Live, pointed at the archived copy - so an archived trip and the live
// feed are the same page. No post text or image name is duplicated into code.
const writeArticleFile = ({ folder, component, posts }) => {
  const source = `import NavBar from "../../components/navBar.component";
import PostsFeed from "../../components/postsFeed.component";

// A finished trip, rendered by the same component as /Live. The text and image
// names come from ${folder}/posts/posts.json in the content bucket, copied
// verbatim off the live feed by scripts/liveToArticle.mjs - ${posts} posts.
const ${component} = () => (
  <>
    <NavBar/>
    <PostsFeed folder="${folder}"/>
  </>
);

export default ${component};
`;

  const target = path.join(ROOT, "src", "screens", "articles", `${TRIP}.jsx`);
  step(`Writing ${path.relative(ROOT, target)}`);
  if (DRY_RUN) {
    log(`  [dry-run] ${source.split("\n").length} lines`);
    return;
  }
  if (fs.existsSync(target) && !flags.force) {
    die(`${path.relative(ROOT, target)} already exists - pass --force to overwrite.`);
  }
  fs.writeFileSync(target, source);
  log(`  wrapper for ${posts} posts`);
};

// Anchored edits: if an anchor is missing the script says so rather than
// guessing, and prints the snippet to paste by hand.
const patchFile = (relPath, edits) => {
  const target = path.join(ROOT, relPath);
  const original = fs.readFileSync(target, "utf8");
  let source = original;
  const skipped = [];

  for (const { anchor, insert, skipIf } of edits) {
    if (skipIf && source.includes(skipIf)) continue;
    if (!source.includes(anchor)) {
      skipped.push(insert);
      continue;
    }
    source = source.replace(anchor, `${insert}${anchor}`);
  }

  if (skipped.length) {
    log(`  !! could not find the anchor in ${relPath} - add this by hand:\n`);
    log(skipped.join("\n"));
    return;
  }
  if (source === original) {
    log("  already up to date");
    return;
  }
  if (DRY_RUN) {
    log(`  [dry-run] would patch ${relPath}`);
    return;
  }
  fs.writeFileSync(target, source);
  log(`  patched ${relPath}`);
};

const patchApp = ({ component, route }) => {
  step("Registering the route in src/App.js");
  patchFile("src/App.js", [
    {
      anchor: "import LiveScreen from './screens/liveScreen.screen.jsx';",
      insert: `import ${component} from './screens/articles/${TRIP}';\n`,
      skipIf: `./screens/articles/${TRIP}'`,
    },
    {
      anchor: `\n\n          <Route element={<LiveScreen/>} path="/Live"/>`,
      insert: `\n          <Route element={<${component}/>} path="${route}"/>`,
      skipIf: `path="${route}"`,
    },
  ]);
};

const patchArticlesScreen = ({ title, date, route, blurb }) => {
  step("Adding the preview card to src/screens/articlesScreen.screen.jsx");
  patchFile("src/screens/articlesScreen.screen.jsx", [
    {
      anchor: "  ];\n\n  const articleContainer = {",
      skipIf: `ref: "${TRIP}"`,
      insert: `    {
      ref: "${TRIP}",
      blurb: "${blurb.replace(/"/g, '\\"')}",
      date: "${date}",
      title: "${title}",
      route: "${route}",
    },
`,
    },
  ]);
};

// ---------------------------------------------------------------- reset

// Originals are only ever MOVED to archive/<trip>/ inside the live bucket, and
// only once every one of them is proven to exist intact in the content bucket.
// Requires the manifest that `build` wrote, so there is no way to archive
// anything that was never verified as copied.
const readManifest = () => {
  const manifestPath = path.join(workDir(), "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    die(`reset needs .live-export/${TRIP}/manifest.json, written by \`build\`.
Run the build step first (on this machine) so there is proof the feed was
copied and verified before anything here is moved.`);
  }
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
};

const verifyManifestCopies = (manifest, liveBucket) => {
  step(`Re-verifying ${manifest.verified.length} copied object(s) in s3://${manifest.contentBucket}/${manifest.folder}/`);
  if (DRY_RUN) {
    log("  [dry-run] skipped");
    return;
  }

  const copies = listObjects(manifest.contentBucket, `${manifest.folder}/`);
  const problems = [];
  for (const entry of manifest.verified) {
    const copy = copies.get(entry.copiedTo);
    if (!copy) problems.push(`${entry.copiedTo} is MISSING from the content bucket`);
    else if (copy.size !== entry.size) {
      problems.push(`${entry.copiedTo} size mismatch: expected ${entry.size}, found ${copy.size}`);
    } else if (isPlainMd5(copy.etag) && copy.etag !== entry.md5) {
      problems.push(`${entry.copiedTo} checksum mismatch: expected ${entry.md5}, found ${copy.etag}`);
    }
  }
  if (problems.length) {
    die(`${problems.length} copied object(s) failed verification - the live bucket has NOT been touched:\n  ${problems.join("\n  ")}`);
  }
  log(`  all ${manifest.verified.length} copy/copies verified against the manifest`);

  // Anything in the live bucket the manifest doesn't cover was posted after the
  // build ran, so it has no verified copy anywhere. Refuse rather than sweep it
  // into the archive.
  const covered = new Set(manifest.verified.map(e => e.source));
  const live = listObjects(liveBucket, IMAGE_PREFIX);
  const stragglers = [...live.keys()].filter(key => key !== IMAGE_PREFIX && !covered.has(key));
  if (stragglers.length && !flags.force) {
    die(`${stragglers.length} live image(s) are not in the manifest - they were probably
posted after \`build\` ran, so they have no verified copy:
  ${stragglers.slice(0, 10).join("\n  ")}${stragglers.length > 10 ? `\n  ... and ${stragglers.length - 10} more` : ""}

Re-run \`build --force\` to pick them up, or pass --force to archive them anyway.`);
  }
};

const resetFeed = () => {
  const { bucket: liveBucket, distributionId } = resolveLiveBucket();
  const manifest = readManifest();
  const archivePrefix = `archive/${TRIP}/`;
  const archivedPostsKey = `${archivePrefix}${POSTS_KEY}`;

  const existing = aws(
    ["s3api", "head-object", "--bucket", liveBucket, "--key", archivedPostsKey, "--output", "json"],
    { allowFail: true }
  );
  if (existing && !flags.force) {
    die(`s3://${liveBucket}/${archivedPostsKey} already exists - pass --force to overwrite.`);
  }

  // Prove the content-bucket copies are intact before touching anything.
  verifyManifestCopies(manifest, liveBucket);

  // Keep a local copy of the feed as it stands too: the only thing that makes
  // emptying posts.json safe is having it somewhere else first.
  const localCopy = path.join(workDir(), "posts.archived.json");
  if (!DRY_RUN) {
    aws(["s3api", "get-object", "--bucket", liveBucket, "--key", POSTS_KEY, localCopy, "--output", "json"]);
    log(`  local copy: .live-export/${TRIP}/posts.archived.json`);
  }

  step(`Archiving ${POSTS_KEY} -> ${archivedPostsKey}`);
  awsWrite([
    "s3", "cp",
    `s3://${liveBucket}/${POSTS_KEY}`,
    `s3://${liveBucket}/${archivedPostsKey}`,
    "--content-type", "application/json",
    "--only-show-errors",
  ]);

  step(`Verifying ${archivedPostsKey}`);
  if (DRY_RUN) {
    log("  [dry-run] skipped");
  } else {
    const problem = compareToRemote(
      localCopy,
      listObjects(liveBucket, archivedPostsKey).get(archivedPostsKey),
      archivedPostsKey
    );
    if (problem) die(`The archive did not verify - the live feed has NOT been emptied.\n  ${problem}`);
    log("  verified (size + checksum)");
  }

  step(`Moving ${IMAGE_PREFIX} -> ${archivePrefix}${IMAGE_PREFIX} (move, not delete)`);
  awsWrite([
    "s3", "mv",
    `s3://${liveBucket}/${IMAGE_PREFIX}`,
    `s3://${liveBucket}/${archivePrefix}${IMAGE_PREFIX}`,
    "--recursive", "--only-show-errors",
  ]);

  step(`Emptying ${POSTS_KEY}`);
  const emptyFile = path.join(workDir(), "empty-posts.json");
  fs.writeFileSync(emptyFile, "[]\n");
  awsWrite([
    "s3", "cp", emptyFile, `s3://${liveBucket}/${POSTS_KEY}`,
    "--content-type", "application/json",
    "--cache-control", NO_CACHE,
    "--only-show-errors",
  ]);

  if (distributionId) {
    step(`Invalidating /${POSTS_KEY} on ${distributionId}`);
    const out = awsWrite(
      ["cloudfront", "create-invalidation", "--distribution-id", distributionId,
       "--paths", `/${POSTS_KEY}`, "--output", "json"],
      { allowFail: true }
    );
    if (!DRY_RUN && !out) log("  invalidation failed (harmless - posts.json is stored no-cache)");
  }

  step("Done");
  log(`  archived: s3://${liveBucket}/${archivePrefix}`);
  log("  live feed is now empty - start posting for the next trip.");
};

// ---------------------------------------------------------------- run

if (DRY_RUN) log("(dry run - no writes)");
if (mode === "build") buildArticle();
else resetFeed();
