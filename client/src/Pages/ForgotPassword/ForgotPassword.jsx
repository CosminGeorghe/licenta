import { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/send-reset-password-to-email`, {
        email,
      })
      .then((response) => {
        setEmail("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="forgot_password_container">
      <form className="forgot_password_form" onSubmit={handleSubmit}>
        <div className="forgot_password_form_label-input_container">
          <label htmlFor="email">
            Te rugam sa introduci adresa de email pentru care doriti sa
            schibmati parola
          </label>
          <input
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
            id="email"
            name="email"
            required
          ></input>
        </div>

        <button type="submit" className="forgot_password_btn">
          Trimite
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
