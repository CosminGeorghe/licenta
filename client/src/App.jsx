import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./Pages/Home/index";
import AdminPage from "./Pages/Admin";
import LoginPage from "./Pages/Login/index";
import RegisterPage from "./Pages/Register/index";
import NavBar from "./components/NavBar";
import ProductList from "./Pages/ProductList/index";
import Newsletter from "./components/Newsletter";
import Product from "./Pages/Product/index";
import CartPage from "./Pages/Cart/index";
import { useSelector } from "react-redux";
import User from "./Pages/User/User";
import CheckoutPage from "./Pages/Checkout";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/login"
            element={user.token ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={user.token ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route path="/user/:id" element={<User />}></Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
