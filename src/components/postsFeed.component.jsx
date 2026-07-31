import React, { useEffect, useState } from "react";
import WebFont from "webfontloader";
import { defaultTextStyle } from "../styles/textStyle";

// The Telegram feed, rendered identically wherever it appears.
//
// A finished trip is archived into the content bucket mirroring the live
// bucket's layout - <folder>/posts/posts.json and <folder>/images/<name> - so
// this component only needs a base URL to render either one:
//
//   /Live         <PostsFeed baseUrl={REACT_APP_LIVE_CDN_URL} noCache />
//   an article    <PostsFeed folder="2603ValleeNoir" />
//
// Both give exactly the same page.
const PostsFeed = ({ folder, baseUrl, noCache }) => {
  const base = baseUrl || `${process.env.REACT_APP_CDN_URL}/${folder}`;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navBarPadding = "50px";

  // Load Google Font (Sono) once
  useEffect(() => {
    WebFont.load({ google: { families: ["Sono"] } });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${base}/posts/posts.json`,
          noCache ? { cache: "no-cache" } : undefined
        );
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [base, noCache]);

  if (loading) return <p style={{ paddingTop: navBarPadding }}>Loading posts…</p>;
  if (!posts.length) return <p style={{ paddingTop: navBarPadding }}>No posts yet.</p>;

  return (
    <div style={{ paddingTop: navBarPadding, maxWidth: 600, margin: "0 auto", paddingLeft: "1rem", paddingRight: "1rem" }}>
      {posts.map((post, index) => (
        <div key={post.id} style={{ paddingBottom: "1rem" }}>
          {/* Text */}
          {typeof post.text === "string"
            ? <p style={{ ...defaultTextStyle, margin: "0.5rem 0" }}>{post.text}</p>
            : post.text.map(line => <p key={line} style={{ ...defaultTextStyle, margin: "0.5rem 0" }}>{line}</p>)
          }

          {/* Images */}
          {post.images?.map(imgFile => (
            <img
              key={imgFile}
              src={`${base}/images/${imgFile}`}
              alt=""
              style={{
    maxWidth: "100%",      // width fits container
    maxHeight: "50vh",     // portrait images don’t take more than 60% of viewport height
    objectFit: "contain",  // keeps aspect ratio
    borderRadius: 4,
    margin: "0.5rem auto",
    display: "block"       // avoids inline spacing issues
  }}
            />
          ))}

          {/* Timestamp */}
          <small style={{ color: "#888", display: "block", marginBottom: "0.5rem" }}>
            {new Date(post.createdAt).toLocaleString()}
          </small>

          {/* Horizontal line between posts */}
          {index < posts.length - 1 && (
            <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "0rem 0" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostsFeed;
