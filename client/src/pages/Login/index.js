import "./style.scss";
import React, { useContext, useState } from "react";
import "./style.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async (e) => {
    e.preventDefault(); // Prevents page refresh when clicked

    const result = await login({ email, password }, dispatch);
    if (!result.success) {
      // Set the error message received from the API
      setErrorMessage(result.message);
    } else {
      setErrorMessage(""); // Clear error message on successful login
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix-logo"
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="loginbutton"
            onClick={handleClick}
            disabled={isFetching}
          >
            Sign In
          </button>
          {errorMessage !== "" ? (
            <div className="error-message">
              {errorMessage}. {" "}
              <Link to="/register">
                <b>Sign up now</b>
              </Link>
            </div>
          ) : (
            <span>
              New to Netflix?
              <Link to="/register">
                <b>Sign up now</b>
              </Link>
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
