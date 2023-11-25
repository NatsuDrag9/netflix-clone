import "./style.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Featured from "../../components/Featured";
import List from "../../components/List";
import { apiUrl } from "../../context/authContext/apiCalls";

function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const get_random_lists = async () => {
      try {
        const response = await axios.get(
          // Localhost
          // `lists${type ? "?type=" + type : ""}&${
          //   genre ? "genre=" + genre : ""
          // }`

          // Vercel
          `${apiUrl}/lists${type ? "?type=" + type : ""}&${
            genre ? "genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
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
