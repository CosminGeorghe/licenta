import { React, useState } from "react";

import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser as loginUserRedux } from "../../redux/userRedux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  addProductsToCart,
  checkIsAdmin,
  getCartProducts,
  loginUser,
} from "../../apiCalls";
import store from "../../redux/store";
import { setProducts } from "../../redux/cartRedux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoging, setIsLoging] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setIsLoging(true);

    try {
      const res = await loginUser(email, password);
      if (res.data.success === 1) {
        dispatch(
          loginUserRedux({
            id: res.data.id,
            name: res.data.name,
            img: res.data.img,
            token: res.data.token,
          })
        );

        try {
          const adminRes = await checkIsAdmin(res.data.token);
          if (adminRes.data.isAdmin === true) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } catch (error) {
          setErrorMessage(error.message);
          navigate("/");
        }
      } else if (res.data.success === 0) {
        setErrorMessage(res.data.data);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoging(false);
    }
    try {
      const response = await getCartProducts(
        store.getState().user.token,
        Number(store.getState().user.id)
      );
      //dispatch(addProductsToCart());
      let responseProducts = response.data.data;
      const cartProducts = responseProducts.map((item) => {
        const { id, title, desc, img, price, quantity, subcategory_id } = item;
        const product = { id, title, desc, img, price, subcategory_id };
        return { product, quantity };
      });
      dispatch(setProducts({ products: cartProducts }));
    } catch (error) {
      console.error("Error getting cart products:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const span = (
    <>
      <span style={{ padding: `10px`, color: "red" }}>{errorMessage}</span>
    </>
  );

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <h1 className="login_title">LOG IN</h1>
        <form onSubmit={submit} className="login_form">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login_input"
          ></input>

          <div className="login_password_input_container">
            <input
              placeholder="parola"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="register_password_input"
              required
            ></input>

            <span
              onClick={togglePasswordVisibility}
              className="register_password_icon"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <button disabled={isLoging} type="submit" className="login_button">
           INTRA IN CONT
          </button>
          {errorMessage && span}
          <Link to={"/forgot-password"} className="login_link">
            Ai uitat parola?
          </Link>
          <Link to={"/register"} className="login_link">
            Creaza un cont nou
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
