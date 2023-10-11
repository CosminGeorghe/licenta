import { Send } from "@mui/icons-material";
import "./Newsletter.css";
import { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [recipient, setRecipient] = useState("");
  const subject = 'newsletter';
  const message = 'Tocmai te-ai abonat la newsletter';

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/send-email`, { recipient, subject, message })
      .then((response) => {
        setRecipient('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <>
      <div className="newsletter_container">
        <div className="newsletter_title">Newsletter</div>
        <div className="newsletter_desc">
          Primeste din timp update-uri despre noile produse adaugate.
        </div>
        <form onSubmit={handleSubmit} className="newsletter_input_container">
          <input
            placeholder="Adresa ta de email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="newsletter_input"
          ></input>
          <button type="submit" className="newsletter_button">
            <Send />
          </button>
        </form>
      </div>
    </>
  );
};

export default Newsletter;
