import "./ResetPassword.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../apiCalls";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ResetPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc");
      return;
    }

    try {
      const response = await resetPassword({
        token: token,
        password: password,
      });
      if (Number(response.data.success) === Number(1)) {
        setSuccess(true);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="reset_password_container">
        <div className="reset_password_form">
          <p>Parola resetata cu succes.</p>
          <p>Acum te poti loga folosind noua parola.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reset_password_container">
      <form onSubmit={handleResetPassword} className="reset_password_form">
        <h2>Introdu Parola Noua</h2>
        <div className="reset_password_form_input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Noua Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="register_password_icon"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        <div className="reset_password_form_input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirma Parola"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            onClick={toggleConfirmPasswordVisibility}
            className="register_password_icon"
          >
            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>

        {error && <p>{error}</p>}
        <button type="submit" className="reset_password_btn">
          Reseteaza Parola
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
