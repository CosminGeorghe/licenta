import "./index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createOrder,
  deleteProductsFromCart,
  getUserAccountDetails,
  getUserAddressDetails,
} from "../../apiCalls";
import { removeProducts } from "../../redux/cartRedux";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    judet: "",
    oras: "",
    address: "",
  });
  const dispatch = useDispatch();

  let total = 10;

  cart.products.map((product) => {
    total += product.product.price * product.quantity;
  });

  const fetchUserDetails = async () => {
    let databaseUser = {};
    const responseAccountDetails = await getUserAccountDetails(
      user.token,
      user.id
    );
    const responseAddressDetails = await getUserAddressDetails(
      user.token,
      user.id
    );
    databaseUser.name = responseAccountDetails.data.data.name;
    databaseUser.number = responseAddressDetails.data.data.number;
    databaseUser.judet = responseAddressDetails.data.data.judet;
    databaseUser.oras = responseAddressDetails.data.data.oras;
    databaseUser.address = responseAddressDetails.data.data.address;
    console.log(databaseUser);

    setFormData((prevState) => ({
      ...prevState,
      name: databaseUser.name,
      number: databaseUser.number,
      judet: databaseUser.judet,
      oras: databaseUser.oras,
      address: databaseUser.address,
    }));
  };

  useEffect(() => {
    if (user.token) {
      fetchUserDetails();
    }
  }, []);

  const handleAddOrder = (e) => {
    e.preventDefault();
    let orderData = {};
    if (user.id) {
      orderData.user_id = user.id;
    } else {
      orderData.user_id = 0;
    }
    orderData.name = formData.name;
    orderData.number = formData.number;
    orderData.judet = formData.judet;
    orderData.oras = formData.oras;
    orderData.address = formData.address;
    orderData.products = cart.products;
    orderData.total = total;
    createOrder(orderData);
    dispatch(removeProducts());
    if (user.token !== null) deleteProductsFromCart(user.token, user.id);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal_content">
            <h2>Comanda a fost inregistrata cu succes.</h2>
            <p>
              Daca ai fost logat la momentul confirmarii comenzi, atunci poti
              vizualiza comanda in contul tau.
            </p>
            <div className="modal_buttons_container">
              <Link to="/" className="modal_link">
                <button>Ok</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleAddOrder} className="checkout_container">
        <p>Produse:</p>
        <div className="checkout_products_container">
          {cart.products.map((product) => (
            <Link
              to={`/product/${product.product.id}`}
              className="checkout_product_link"
            >
              <>
                <a>{product.product.title}</a>
                <p>
                  &nbsp; * {product.quantity} ={" "}
                  {(product.product.price * product.quantity).toFixed(2)}
                </p>
              </>
            </Link>
          ))}
        </div>
        <p>Detalii livrare</p>
        <div>
          <div className="checkout_input_container">
            <label>Nume:</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            ></input>
          </div>
          <div className="checkout_input_container">
            <label>Numar de telefon:</label>
            <input
              type="text"
              required
              value={formData.number}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  number: e.target.value,
                }))
              }
            ></input>
          </div>
          <div className="checkout_input_container">
            <label>Judet:</label>
            <input
              type="text"
              required
              value={formData.judet}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  judet: e.target.value,
                }))
              }
            ></input>
          </div>
          <div className="checkout_input_container">
            <label>Oras</label>
            <input
              type="text"
              required
              value={formData.oras}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  oras: e.target.value,
                }))
              }
            ></input>
          </div>
          <div className="checkout_input_container">
            <label>Adresa:</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }))
              }
            ></input>
          </div>
        </div>
        <p>Total de plata: {total.toFixed(2)} lei</p>
        <p>Banii se vor oferi cash livratorului la sosirea coletului</p>
        <button type="submit" className="checkout_btn">
          Trimite comanda
        </button>
      </form>
    </>
  );
};

export default CheckoutPage;
