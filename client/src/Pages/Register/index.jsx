import React, { useState } from "react";

import "./index.css";
import env from "react-dotenv";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const RegisterPage = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isRegistering, setIsRegistering] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      setErrorMessage(null);
      setIsRegistering(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/register`, {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          navigate(`/login`);
        })
        .catch(function (error) {
          if (error.response && error.response.status === 409) {
            setErrorMessage(error.response.data.message);
          } else {
            console.log("error", error.message);
          }
        })
        .finally(() => {
          setIsRegistering(false);
        });
    } else if (password !== confirmPassword) {
      setErrorMessage("Parolele sunt diferite");
    } else if (password.length <= 8) {
      setErrorMessage("Introdu o parola de minim 8 caractere");
    }
  };

  const span = (
    <>
      <span style={{ padding: `10px`, color: "red" }}>{errorMessage}</span>
    </>
  );

  return (
    <div className="register_container">
      <div className="register_wrapper">
        <h1 className="register_title">CREATE AN ACCOUNT</h1>
        <form className="register_form" onSubmit={registerUser}>
          <input
            placeholder="nume si prenume"
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="register_input"
            required
          ></input>
          <input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="register_input"
            required
          ></input>

          <div className="register_password_input_container">
            <input
              placeholder="parola"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="register_password_input"
              required
            ></input>

            <span
              onClick={togglePasswordVisibility}
              className="register_password_icon"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <div className="register_password_input_container">
            <input
              placeholder="confirma parola"
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="register_password_input"
              required
            ></input>

            <span
              onClick={toggleConfirmPasswordVisibility}
              className="register_password_icon"
            >
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <div className="register_form_bottom">
            {errorMessage && span}
            <span className="register_agreement">
              Prin crearea unui cont declar ca sunt de acord ca datele sa imi
              fie procesate
            </span>
            <button disabled={isRegistering} className="register_button">
              CREAZA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
