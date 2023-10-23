import React, { useState } from "react";

import './Login.css'

import userIcon from "./assets/person.png";
import emailIcon from "./assets/email.png";
import passwordIcon from "./assets/password.png";

function Login({ setIsLogged }) {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={userIcon} alt="User Icon" />
          <input type="text" placeholder="Username"/>
        </div>
        {
          action === "Sign Up" ? (
            <div className="input">
              <img src={emailIcon} alt="Email Icon" />
              <input type="text" placeholder="Email"/>
            </div>
          ) : null
        }
        <div className="input">
          <img src={passwordIcon} alt="Password Icon" />
          <input type="text" placeholder="Password"/>
        </div>
      </div>
      {
        action === "Login" ? (
          <div className="forgot-password">Lost password? <span>Click Here!</span></div>
        ) : null
      }
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
      </div>
    </div>
  );
}

export default Login;
