import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/Home/index";
import LoginPage from "./Pages/Login/index";
import RegisterPage from "./Pages/Register/index";
import NavBar from "./components/NavBar";
import ProductList from "./Pages/ProductList/index";
import Newsletter from "./components/Newsletter";
import Product from "./Pages/Product/index";
import CartPage from "./Pages/Cart/index";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product" element={<Product />} />
        </Routes>
        <Newsletter />
      </div>
    </Router>
  );
};

export default App;
