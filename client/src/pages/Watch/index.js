import React from "react";
import "./style.scss";
import { useLocation, Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function Watch() {
  const location = useLocation();
  const { movie } = location.state || {};
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlinedIcon />
        <Link to="/" className="link">
            Home
          </Link>
      </div>
      <iframe
        width="752"
        height="423"
        // src="https://www.youtube.com/embed/F8o9AryV4i4"
        src={movie ? movie.video : "https://www.youtube.com/embed/F8o9AryV4i4"}
        title={
          movie
            ? movie.title
            : "20 MIND BLOWING Plot Holes In One Piece Explained!"
        }
        // title="20 MIND BLOWING Plot Holes In One Piece Explained!"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Watch;
