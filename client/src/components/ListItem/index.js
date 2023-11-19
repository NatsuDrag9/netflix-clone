import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get("/movies/find/" + item, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTI0MDRlMjc2ZmEzMDQyYTEzOWY2ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5OTk5MzM3NiwiZXhwIjoxNzAwNDI1Mzc2fQ.XDEwBBOU7xo4vbKoPdmMSIZKTwi5v81vxuIy03R5Gx8",
          },
        });

        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    
    <Link to={{ pathname: "/watch", state:{movie: movie} }}>
      <div
        className="listitem"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // Calculation done manually
        style={{ left: isHovered && index * 200 - 50 + index * 2.5 }}
      >
        <img
          // src="https://www.crunchyroll.com/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/1ecde018e863e2aaee31f00a23378c35.jpe"
          src={movie.img}
          alt="listitem"
        />
        {/* Show video and item content when hovered */}
        {isHovered && (
          <>
            {/* <div className="hovered-wrapper"> */}
            <iframe
              width="752"
              height="423"
              // src="https://www.youtube.com/embed/CmTeYj2FmRc"
              src={movie.video}
              title="One Piece: Wano Arc | OFFICIAL PREVIEW"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="iteminfo">
              <div className="icons">
                <PlayArrowIcon className="icon" />
                <AddIcon className="icon" />
                <ThumbUpOutlinedIcon className="icon" />
                <ThumbDownAltOutlinedIcon className="icon" />
              </div>
              <div className="iteminfotop">
                <span>1 hour 14 mins</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="description">
                {movie.description}
                {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              neque maiores ad ratione! Laudantium distinctio ullam totam
              voluptatum magnam debitis accusamus cum illo, alias, corporis
              sapiente, culpa dicta quos dolores! */}
              </div>
              <div className="genre">{movie.genre}</div>
            </div>
            {/* </div> */}
          </>
        )}
      </div>
    </Link>
  );
}

export default ListItem;
