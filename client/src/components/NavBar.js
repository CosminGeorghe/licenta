import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./NavBar.css";
import companyLogo from "../images/logo.jpg";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userRedux";

const NavBar = () => {
  const user = useSelector((state) => state.user);

  const quantity = useSelector((state) => state.cart.quantity);

  const [searchText, setSearchText] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchText !== "") {
        navigate(`/products?search=${searchText}`);
      }
    }
  };

  const logOut = () => {
    dispatch(logoutUser());
  };

  let conditionalUserData;
  if (user.token) {
    conditionalUserData = (
      <>
        <Link to={`/user/${user.id}`} className="navbar_link">
          {user.name}
        </Link>
        <button onClick={logOut} className="navbar_btn">Log Out</button>
      </>
    );
  } else {
    conditionalUserData = (
      <>
        <Link to="/login" className="navbar_link">
          Login
        </Link>
        <Link to="/register" className="navbar_link">
          Register
        </Link>
      </>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <nav className="navbar_nav">
        <div className="navbar_wrapper">
          <Link to="/" className="navbar_link">
            <div className="left">
              <img src={companyLogo} height={50} alt="Logo companie" />
            </div>
          </Link>

          <div className="center search_container">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              onKeyUp={handleKeyPress}
              type="text"
              id="search"
              name="search"
              placeholder="Cauta produse"
            ></input>

            <Link
              to={searchText !== "" ? `/products/?search=${searchText}` : "#"}
              className="navbar_link"
            >
              <SearchIcon />
            </Link>
          </div>
          <div className="right">
            {conditionalUserData}
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
