import React, { useEffect, useState } from "react";
import ArticleText from "../components/articleText.component"
import ArticleHeader from "../components/articleHeader.component"
import NavBar from "../components/navBar.component"
import { useNavigate } from "react-router-dom"
import '../styles/accentButton.style.css';
import "../styles/homePageText.style.css"
import WebFont from "webfontloader";
import { defaultTextStyle } from "../styles/textStyle";

const LiveScreen = () => {
    const navigate = useNavigate();
    return (
        <>
            <NavBar/>
            <PostsFeed/>
        </>
    )
}

export default LiveScreen


const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const CDN_URL = process.env.REACT_APP_LIVE_CDN_URL;

  const navBarPadding = "50px";

  // Load Google Font (Sono) once
  useEffect(() => {
    WebFont.load({ google: { families: ["Sono"] } });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${CDN_URL}/posts/posts.json`, { cache: "no-cache" });
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
  }, [CDN_URL]);

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
              src={`${CDN_URL}/images/${imgFile}`}
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
