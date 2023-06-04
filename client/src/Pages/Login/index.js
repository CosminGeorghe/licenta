import { React, useState } from "react";

import Axios from "axios";

import "./index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/users/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        //setShowMessage(true);
        //("Pet adaugat cu succes!!!");
        //setTimeout(navigateToListare, 1000);
      })
      .catch(function (error) {
        console.log(error.message);
        //(true);
        //("A aparut o eroare: " + error.message);
      });
  }

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <h1 className="login_title">SIGN IN</h1>
        <form onSubmit={submit} className="login_form">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login_input"
          ></input>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login_input"
          ></input>
          <button type="submit" className="login_button">
            Login
          </button>
          <a className="login_link">DO YOU NOT REMEMBER THE PASSWORD?</a>
          <a className="login_link">CREATE A NEW ACCOUNT</a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
