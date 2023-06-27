import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./NavBar.css";
import companyLogo from "../images/logo.jpg";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const NavBar = () => {
  const quantity = useSelector(state => state.cart.quantity)


  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <nav className="navbar_nav">
        <div className="navbar_wrapper">
          <Link to="/login" className="navbar_link">
            <div className="left">
              <img src={companyLogo} height={50} alt="Logo companie" />
            </div>
          </Link>

          <div className="center search_container">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Cauta produse"
            ></input>
            <button>
              <SearchIcon />
            </button>
          </div>
          <div className="right">
            <Link to="/login" className="navbar_link">
              Login
            </Link>
            <Link to="/register" className="navbar_link">
              Register
            </Link>
            <Link to="/cart" className="navbar_link">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;