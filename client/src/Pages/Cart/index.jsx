import { Add, Remove } from "@mui/icons-material";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setProducts } from "../../redux/cartRedux";
import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [showNotLogedInModal, setShowNotLogedInModal] = useState(false);
  const [showNoProductsModal, setShowNoProductsModal] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  let subtotal = 0;

  cart.products.forEach((element) => {
    subtotal += element.product.price * element.quantity;
  });

  let estimatedShipping = 10;

  const handleCheckout = () => {
    if (cart.products.length === 0) {
      setShowNoProductsModal(true);
    } else if (user.token) {
      navigate("/checkout");
    } else {
      setShowNotLogedInModal(true);
    }
  };

  const handleProductsModalCancel = () => {
    setShowNoProductsModal(false);
  };

  const handleLoginModalCancel = () => {
    setShowNotLogedInModal(false);
  };

  return (
    <>
      {showNoProductsModal && (
        <div className="modal">
          <div className="modal_content">
            <h2>Nu ai nici un produs in cosul de cumparaturi</h2>
            <div>
              <Link to="/products" className="cart_top_button_unfilled">
                <button>Catre produse</button>
              </Link>
              <button onClick={handleProductsModalCancel}>Anuleaza</button>
            </div>
          </div>
        </div>
      )}
      {showNotLogedInModal && (
        <div className="modal">
          <div className="modal_content">
            <h2>Nu esti logat</h2>
            <div className="modal_buttons_container">
              <Link to="/register" className="modal_link">
                <button>Creare cont</button>
              </Link>
              <Link to="/login" className="modal_link">
                <button>Logare</button>
              </Link>{" "}
            </div>{" "}
            <div className="modal_buttons_container">
              <Link to="/checkout" className="modal_link">
                <button>Continua fara cont</button>
              </Link>
              <button onClick={handleLoginModalCancel}>Anuleaza</button>
            </div>
          </div>
        </div>
      )}
      <div className="cart_container">
        <div className="cart_wrapper">
          <h1 className="cart_title">COSUL TAU</h1>
          <div className="cart_top">
            <Link to="/products" className="cart_top_button_unfilled">
              <button className="cart_top_button_unfilled">
                CONTINUA CUMPARATURILE
              </button>
            </Link>
            <div className="cart_top_texts">
              <span className="cart_top_text">
                Produse in cos: {cart.products.length}
              </span>
            </div>
            <button onClick={handleCheckout} className="cart_top_button_filled">
              CONTINUA CATRE PLATA
            </button>
          </div>
          <div className="cart_bottom">
            <div className="cart_info">
              <hr className="cart_hr"></hr>
              {cart.products.map((product) => (
                <CartProduct product={product} />
              ))}
            </div>
            <div className="cart_sumamary">
              <h1 className="cart_summary_title">ORDER SUMMARY</h1>
              {cart.products.map((product) => (
                <div className="cart_summary_item">
                  <span className="cart_Summary_item_text">
                    {product.product.title}
                  </span>
                  <span className="cart_Summary_item_price">
                    {product.product.price} * {product.quantity} ={" "}
                    {product.product.price * product.quantity} lei
                  </span>
                </div>
              ))}
              <div className="cart_summary_item">
                <span className="cart_Summary_item_text">Subtotal</span>
                <span className="cart_Summary_item_price">
                  {subtotal.toFixed(2)} lei
                </span>
              </div>
              <div className="cart_summary_item">
                <span className="cart_Summary_item_text">
                  Estimated shipping
                </span>
                <span className="cart_Summary_item_price">
                  {estimatedShipping} lei
                </span>
              </div>
              <div className="cart_summary_item_total">
                <span className="cart_Summary_item_text">TOTAL</span>
                <span className="cart_Summary_item_price">
                  {(subtotal + estimatedShipping).toFixed(2)} lei
                </span>
              </div>
              <button onClick={handleCheckout} className="cart_button">
                CONTINUA CATRE PLATA
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
