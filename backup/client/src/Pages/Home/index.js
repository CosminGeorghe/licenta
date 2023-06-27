import { React, useState } from "react";

import Axios from "axios";

import Slider from "./Slider";
import NavBar from "../../components/NavBar";
import Categories from "./Categories";
import Products from "../../components/Products";
import Newsletter from "../../components/Newsletter";

const HomePage = () => {
  return (
    <>
      <Slider />
      <Categories />
      <Products />
    </>
  );
};

export default HomePage;
