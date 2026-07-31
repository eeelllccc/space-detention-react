import React from "react";
import NavBar from "../components/navBar.component"
import PostsFeed from "../components/postsFeed.component"
import '../styles/accentButton.style.css';
import "../styles/homePageText.style.css"

const LiveScreen = () => {
    return (
        <>
            <NavBar/>
            <PostsFeed baseUrl={process.env.REACT_APP_LIVE_CDN_URL} noCache/>
        </>
    )
}

export default LiveScreen
