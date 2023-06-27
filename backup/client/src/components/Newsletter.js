import { Send } from "@mui/icons-material";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <>
      <div class="newsletter_container">
        <div className="newsletter_title">Newsletter</div>
        <div className="newsletter_desc">
          Primeste din timp update-uri despre produsele tale favorite.
        </div>
        <div className="newsletter_input_container">
          <input placeholder="Your email" className="newsletter_input"></input>
          <button className="newsletter_button">
            <Send />
          </button>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
