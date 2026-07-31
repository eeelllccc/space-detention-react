import NavBar from "../../components/navBar.component";
import PostsFeed from "../../components/postsFeed.component";

// A finished trip, rendered by the same component as /Live. The text and image
// names come from 2603ValleeNoir/posts/posts.json in the content bucket, copied
// verbatim off the live feed by scripts/liveToArticle.mjs - 127 posts.
const ValleeNoirScreen = () => (
  <>
    <NavBar/>
    <PostsFeed folder="2603ValleeNoir"/>
  </>
);

export default ValleeNoirScreen;
