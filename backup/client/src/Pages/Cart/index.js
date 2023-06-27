import { Add, Remove } from "@mui/icons-material";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setProducts } from "../../redux/cartRedux";
import { useEffect } from "react";
import CartProduct from "./CartProduct";

const CartPage = () => {

  const cart = useSelector(state => state.cart);

  let subtotal = 0;

  cart.products.forEach(element => {
    subtotal += element.product.price * element.quantity;
  });

  let estimatedShipping = 10;

  return (
    <div className="cart_container">
      <div className="cart_wrapper">
        <h1 className="cart_title">YOUR CART</h1>
        <div className="cart_top">
          <button className="cart_top_button_unfilled">
            CONTINUE SHOPPING
          </button>
          <div className="cart_top_texts">
            <span className="cart_top_text">Cart({cart.products.length})</span>
            <span className="cart_top_text">Your Wishlist(0)</span>
          </div>
          <button className="cart_top_button_filled">CHECK OUT NOW</button>
        </div>
        <div className="cart_bottom">
          <div className="cart_info">
            <hr className="cart_hr"></hr>
            {cart.products.map(product => (
              <CartProduct product = {product}/>
            ))}
          </div>
          <div className="cart_sumamary">
            <h1 className="cart_summary_title">ORDER SUMMARY</h1>
            {cart.products.map((product) => (
              <div className="cart_summary_item">
                <span className="cart_Summary_item_text">{product.product.title}</span>
                <span className="cart_Summary_item_price">{product.product.price} * {product.quantity} = {product.product.price * product.quantity} lei</span>
              </div>
            ))}
            <div className="cart_summary_item">
              <span className="cart_Summary_item_text">Subtotal</span>
              <span className="cart_Summary_item_price">{subtotal} lei</span>
            </div>
            <div className="cart_summary_item">
              <span className="cart_Summary_item_text">Estimated shipping</span>
              <span className="cart_Summary_item_price">{estimatedShipping} lei</span>
            </div>
            <div className="cart_summary_item_total">
              <span className="cart_Summary_item_text">TOTAL</span>
              <span className="cart_Summary_item_price">{subtotal + estimatedShipping} lei</span>
            </div>
            <button className="cart_button">CHECK OUT NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
