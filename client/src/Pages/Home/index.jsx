import "./index.css";
import { React, useState } from "react";

import Axios from "axios";

import Slider from "./Slider";
import NavBar from "../../components/NavBar";
import Categories from "./Categories";
import Products from "../../components/Products";
import Newsletter from "../../components/Newsletter";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const navigateToProducts = () => {
    navigate("/products?allproducts=true");
  };

  return (
    <>
      <Slider />
      <Categories />
      <div className="homepage_btn_container">
        <button onClick={navigateToProducts} className="homepage_btn">
          Vizualizeaza toate produsele
        </button>
      </div>
      <Products />
      <Newsletter />
    </>
  );
};

export default HomePage;
