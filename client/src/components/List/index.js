import React, { useRef, useState } from "react";
import "./style.scss";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ListItem from "../ListItem";

function List({ list }) {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();

  const handleClick = (dir) => {
    setIsMoved(true);
    const containerMarginLeft = 50; // margin-left of container = 50px;
    let dist = listRef.current.getBoundingClientRect().x - containerMarginLeft;
    if (dir === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + dist}px)`;
    }
    if (dir === "right" && slideNumber < list.content.length ) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${dist - 230}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listtitle">{list.title}</span>
      {/* <span className="listtitle">Continue to watch</span> */}
      <div className="wrapper">
        <ArrowBackIosOutlinedIcon
          className="sliderarrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} item={item} key={i} />
          ))}
        </div>
        
        <ArrowForwardIosOutlinedIcon
          className="sliderarrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default List;
