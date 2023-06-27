import { React, useState } from "react";

import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import "./index.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userRedux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    Axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.data.success === 1) {
          console.log(res.data);
          dispatch(
            loginUser({
              id: res.data.id,
              name: res.data.name,
              token: res.data.token,
            })
          );
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <h1 className="login_title">LOG IN</h1>
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
          <Link to={"/register"} className="login_link">
            CREATE A NEW ACCOUNT
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
