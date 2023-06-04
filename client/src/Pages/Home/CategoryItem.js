import "./CategoryItem.css";
import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="categoryitem_container">
      <img src={item.img} className="categoryitem_image"></img>
      <div className="categoryitem_info">
        <h1 className="categoryitem_title">{item.title}</h1>
        <Link to="/products" className="categoryitem_button">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
