import "./style.scss";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthAction";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const {dispatch} = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    // cleanup
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix-logo"
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>

          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My Lists</span>
        </div>
        <div className="right">
          <SearchIcon className="icons" />
          <span>KID</span>
          <NotificationsIcon className="icons" />
          <img
            src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/04/Fairy-Tail-Natsu-Dragneel-Surrounded-By-Fire.jpg?q=50&fit=contain&w=943&h=&dpr=1.5"
            alt="profile-icon"
          />
          <div className="profile">
            <ArrowDropDownIcon className="icons" />
            <div className="options">
              {/* <span>Settings</span> */}
              <span onClick={() => {dispatch(logout())}}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
