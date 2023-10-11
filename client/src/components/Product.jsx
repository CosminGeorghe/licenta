import { Diversity2Outlined } from "@mui/icons-material";
import "./Product.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Product = ({ product }) => {//Cookies.remove('cart');


  const dispatch = useDispatch();

  const addToCart = (event) => {
    event.preventDefault();
    dispatch(addProduct({ product: product, quantity: 1, price: product.price }))
  }

  return (
    <Link to={`/product/${product.id}`} className="product_container">
      <img src={product.img} className="product_image" />
      <div className="product_info">
        <h1 className="product_title">{product.title}</h1>
        <p className="product_price">{product.price} LEI</p>
        <button onClick={addToCart} className="product_cos_btn">ADAUGA IN COS</button>
      </div>
    </Link>
  );
};

export default Product;
