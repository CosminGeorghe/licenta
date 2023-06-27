import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./Pages/Home/index";
import LoginPage from "./Pages/Login/index";
import RegisterPage from "./Pages/Register/index";
import NavBar from "./components/NavBar";
import ProductList from "./Pages/ProductList/index";
import Newsletter from "./components/Newsletter";
import Product from "./Pages/Product/index";
import CartPage from "./Pages/Cart/index";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./redux/cartRedux";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  /*
  useEffect(() => {
    console.log(Cookies.get('cart'));
    if (Cookies.get('cart')) {
      const products = JSON.parse(Cookies.get('cart'));
      dispatch(setProducts({ products: products, quantity: products.length, price: 8000 }))
      console.log(products);
    }
  }, [dispatch]);
*/
  console.log("da");

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route
            path="/login"
            element={user.token ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={user.token ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
        <Newsletter />
      </div>
    </Router>
  );
};

export default App;
