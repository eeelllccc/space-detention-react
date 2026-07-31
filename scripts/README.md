# Turning a live feed into an article

At the end of a trip, `scripts/liveToArticle.mjs` converts whatever is on
`/Live` into a normal article and then resets the feed ready for the next trip.

## How the two feeds are stored

There are two S3 buckets, each behind its own CloudFront distribution. Neither
bucket name is written down in this repo — the script resolves both at runtime
from the CloudFront URLs in `.env`, which is gitignored.

|  | **live bucket** | **content bucket** |
| --- | --- | --- |
| CDN env var | `REACT_APP_LIVE_CDN_URL` | `REACT_APP_CDN_URL` |
| written by | the Telegram lambda | this script, and by hand |
| layout | `posts/posts.json` + `images/<iso>-<uuid>.jpg` | per-article folders + `articleThumbnails/<ref>.jpg` |

The live bucket is **reused for every trip** — there is no new bucket, no
CloudFront change and no Amplify env var change per trip, and the lambda's
`BUCKET` never changes. Each finished trip is archived in place under
`archive/<trip>/`.

To override the discovered names for a one-off run, pass `--live-bucket` or
`--content-bucket`.

### Everything is copied verbatim

A converted trip lands in the content bucket **mirroring the live bucket's own
layout**, with every filename left exactly as the lambda wrote it:

```
<trip>/posts/posts.json        <- byte-identical copy of live posts/posts.json
<trip>/images/<iso>-<uuid>.jpg <- byte-identical copies, original names
articleThumbnails/<trip>.jpg   <- copy of one image, for the /Articles card
```

Nothing is renamed and no image reference inside `posts.json` is rewritten,
which removes a whole class of bug: the copy either matches the original
byte-for-byte or the script refuses to continue.

Because the layout matches, an archived trip is a drop-in replacement for the
live bucket root — `src/components/postsFeed.component.jsx` renders either one
from a base URL, so an archived trip and `/Live` are exactly the same page. The
generated article is a thin wrapper, with no post text or image name duplicated
into code:

```jsx
const ValleeNoirScreen = () => (
  <>
    <NavBar/>
    <PostsFeed folder="2603ValleeNoir"/>
  </>
);
```

## The two commands

`build` only ever copies. `reset` is the one destructive step — run it once
you're happy with the article.

```sh
aws login          # the script shells out to the aws CLI

# 1. safe: copy the feed's images and text into the content bucket, write the article
node scripts/liveToArticle.mjs build --trip 2603ValleeNoir --title "Vallee Noir" \
  --blurb "Twenty-seven days in the Ecrins."

# 2. check it
npm start          # visit /ValleeNoir and /Articles

# 3. destructive: archive the live feed and empty it
node scripts/liveToArticle.mjs reset --trip 2603ValleeNoir
```

Add `--dry-run` to either command to see every write it would make without
making any.

### What `build` does

1. Resolves both buckets from their CloudFront distributions.
2. Reads `posts/posts.json` and downloads every image it references to
   `.live-export/<trip>/images/`, under its original name.
3. **Verifies hop 1** — each downloaded file against the live object's size and
   MD5. Any mismatch aborts.
4. Copies the images to `<folder>/images/` and `posts.json` verbatim to
   `<folder>/posts/posts.json`, plus one image to `articleThumbnails/<trip>.jpg`.
5. **Verifies hop 2** — re-lists the content bucket and checks every object's
   size and MD5 against the local copies. Any mismatch aborts before anything
   else happens.
6. Writes `.live-export/<trip>/manifest.json`, recording each source key, its
   copy key, size and MD5. This is the proof `reset` requires.
7. Writes `src/screens/articles/<trip>.jsx` and patches `src/App.js` (import +
   `<Route>`) and `src/screens/articlesScreen.screen.jsx` (preview card).

Step 7's edits are idempotent and anchored: if an anchor has moved, the script
prints the snippet for you to paste rather than guessing. Re-running refuses to
clobber an existing article unless you pass `--force`. Use `--no-copy` to
regenerate the article alone once the S3 copy is already done.

Note that `build` reads the *live* feed, so after `reset` has emptied it you need
to point at the archived copy to regenerate anything:

```sh
node scripts/liveToArticle.mjs build --trip 2603ValleeNoir --title "Vallee Noir" \
  --no-copy --force --posts-file .live-export/2603ValleeNoir/posts.archived.json
```

### What `reset` does

Nothing is ever deleted. Originals are **moved** into `archive/<trip>/` inside
the live bucket, and only after the copies are proven intact.

1. Refuses to run without `.live-export/<trip>/manifest.json` — so a feed that
   was never copied and verified cannot be archived.
2. Re-verifies every copy against the manifest by size and MD5, and refuses if
   any live image is *not* in the manifest (i.e. was posted after `build` ran,
   so has no verified copy).
3. Downloads `posts.json` locally, copies it to `archive/<trip>/posts/posts.json`,
   and verifies that archive before touching the original.
4. Moves `images/` to `archive/<trip>/images/`.
5. Writes `[]` to `posts/posts.json` with `Cache-Control: no-cache, no-store,
   must-revalidate`, matching what the lambda writes.
6. Invalidates `/posts/posts.json` on the distribution (belt and braces — the
   object is stored no-cache).

Afterwards `/Live` shows "No posts yet." and the next Telegram post starts the
new trip. The archive holds the trip exactly as it was posted, and the trip
ends up in three independent places: the archive, the content bucket, and
`.live-export/<trip>/` on your machine.

## Options

| flag | applies to | default |
| --- | --- | --- |
| `--trip <slug>` | both | **required** — e.g. `2603ValleeNoir`; names the `.jsx`, the content folder, the thumbnail and the archive prefix |
| `--title <str>` | build | **required** — article heading |
| `--blurb <str>` | build | `""` — the `/Articles` card text |
| `--date <dd.mm.yy>` | build | date of the earliest post |
| `--route <path>` | build | derived from title, e.g. `"Vallee Noir"` → `/ValleeNoir` |
| `--component <name>` | build | derived from title, e.g. `ValleeNoirScreen` |
| `--folder <name>` | build | `--trip` — content-bucket folder |
| `--thumbnail <n>` | build | `1` — which image (chronologically) becomes the card thumbnail |
| `--no-copy` | build | off — skip all S3 work, regenerate the `.jsx` only |
| `--no-patch` | build | off — don't touch `App.js` / `articlesScreen` |
| `--posts-file <path>` | build | off — read a local `posts.json` instead of S3, handy for pruning posts first |
| `--force` | both | off — overwrite an existing article / archive, or archive unmanifested images |
| `--live-bucket <name>` | both | discovered from `REACT_APP_LIVE_CDN_URL` |
| `--content-bucket <name>` | build | discovered from `REACT_APP_CDN_URL` |
| `--distribution <id>` | both | discovered via CloudFront |
| `--profile <name>` | both | your default aws profile |
| `--dry-run` | both | off — print every write, make none |
