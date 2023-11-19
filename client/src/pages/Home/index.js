import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Featured from "../../components/Featured";
import List from "../../components/List";

function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const get_random_lists = async () => {
      try {
        const response = await axios.get(
          `lists${type ? "?type=" + type : ""}&${
            genre ? "genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTI0MDRlMjc2ZmEzMDQyYTEzOWY2ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5OTk5MzM3NiwiZXhwIjoxNzAwNDI1Mzc2fQ.XDEwBBOU7xo4vbKoPdmMSIZKTwi5v81vxuIy03R5Gx8",
            },
          }
        );
        setLists(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    get_random_lists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, index) => (
        <List list={list} key={index} />
      ))}
    </div>
  );
}

export default Home;
