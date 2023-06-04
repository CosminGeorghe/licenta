import { Diversity2Outlined } from "@mui/icons-material";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  return (
    <Link to="/product" className="product_container">
      <img src={item.img} className="product_image" />
      <div className="product_info">
        <h1 className="product_title">{item.title}</h1>
        <p className="product_price">{item.price}</p>
        <button className="product_cos_btn">ADAUGA IN COS</button>
        <button className="product_wish_btn">❤️ Adauga in Whislist</button>
      </div>
    </Link>
  );
};

export default Product;
