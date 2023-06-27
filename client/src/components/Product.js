import { Diversity2Outlined } from "@mui/icons-material";
import "./Product.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import Cookies from "js-cookie";

const Product = ({ product }) => {//Cookies.remove('cart');


  const dispatch = useDispatch();

  const writeToCookie = (product, quantity) => {
    //initialize variables
    let cartProducts = {};
    let existingProduct;
    //check if cookie exist, and if so, find and retreive the product is already in the cart
    if (Cookies.get('cart')) {
      cartProducts = JSON.parse(Cookies.get('cart'));
      existingProduct = cartProducts.find(
        (p) => p.product.id === product.id
      );
    }

    //if the product already exist, increment it's quantity, else add it to the array
    if (existingProduct) {
      const updatedCartProducts = cartProducts.map((p) =>
        p.product.id === product.id
          ? { ...p, quantity: p.quantity + quantity }
          : p
      );
      Cookies.set('cart', JSON.stringify(updatedCartProducts));
    } else {
      const updatedCartProducts = cartProducts.length > 0 ? [...cartProducts, { product, quantity }] : [{ product, quantity }];
      //make the cookie expire in 7 days
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      Cookies.set('cart', JSON.stringify(updatedCartProducts), { expires: expirationDate });
    }
    console.log('Cart data written to cookie.');
  };

  const addToCart = (event) => {
    event.preventDefault();
    dispatch(addProduct({ product: product, quantity: 1, price: product.price }))
    //writeToCookie(product, 1);
  }

  return (
    <Link to={`/product/${product.id}`} className="product_container">
      <img src={product.img} className="product_image" />
      <div className="product_info">
        <h1 className="product_title">{product.title}</h1>
        <p className="product_price">{product.price}</p>
        <button onClick={addToCart} className="product_cos_btn">ADAUGA IN COS</button>
        <button className="product_wish_btn">❤️ Adauga in Whislist</button>
      </div>
    </Link>
  );
};

export default Product;
