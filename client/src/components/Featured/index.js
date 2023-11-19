import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { AuthContext } from "../../context/authContext/AuthContext";

function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [displayInfo, setDisplayInfo] = useState(false);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const get_random_content = async () => {
      try {
        const response = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token: "Bearer" + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    get_random_content();
  }, [type]);

  const handleClick = () => {
    setDisplayInfo(!displayInfo);
  };

  return (
    <div className={`featured ${displayInfo ? "show-info" : ""}`}>
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={(e) => {setGenre(e.target.value)}}>
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        width="100%"
        // src="https://camptimberlane.com/wp-content/uploads/2021/05/DSC_0370-768x512.jpg"
        src={content.img}
        alt="feature-img"
        className={`${displayInfo ? "blur" : ""}`}
      />
      <div className="info">
      <h2 className="username">Welcome {user.username}</h2>
        <div className="description-wrapper">
        
          <img
            // src="https://m.media-amazon.com/images/I/81jkB4P2YML._AC_SL1500_.jpg"
            src={content.imgTitle}
            alt="title-img"
          />
          
          <span className="description">
            {/* {content.description} */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            vero sed fuga sit, ducimus labore a officia temporibus neque vitae
            quod eaque tempora cupiditate rerum minus saepe, nihil alias quasi.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
            itaque exercitationem. Quaerat explicabo fugiat cumque quos. Et
            sequi possimus nesciunt eaque facilis temporibus vero expedita
            officiis, nisi exercitationem? Harum, soluta.
          </span>
        </div>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className="more-info" onClick={handleClick}>
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
