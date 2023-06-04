import React from "react";

import "./index.css"

const RegisterPage = () => {
  return (
    <div className="register_container">
      <div className="register_wrapper">
        <h1 className="register_title">CREATE AN ACCOUNT</h1>
        <form className="register_form">
          <input placeholder="name" className="register_input"></input>
          <input placeholder="last name" className="register_input"></input>
          <input placeholder="username" className="register_input"></input>
          <input placeholder="email" className="register_input"></input>
          <input placeholder="password" className="register_input"></input>
          <input placeholder="confirm password" className="register_input"></input>
          <span className="register_agreement">By creatin an account, , I consent tot he processing of my  personal data in accordance with the <b>PRIVACY POLICY</b></span>
          <button className="register_button">CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
