import React, { useContext, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { register } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, isNewUser, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    register({ username, email, password }, dispatch);
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix-logo"
          />
          {!isNewUser && (
            <Link to="/login">
              <button className="loginbutton">Sign In</button>
            </Link>
          )}
        </div>
      </div>
      <div className="container">
        {!isNewUser ? (
          <>
            <h1>Unlimited movies, Tv shows, and more...</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form className="input">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                // ref={emailRef}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                // ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                // ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="registerbutton"
                onClick={handleClick}
                disabled={isFetching}
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <>
            <p>Email or password already exists.</p>
            <Link to="/register">
              <button className="button">Go back</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
