import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./NavBar.css";
import companyLogo from "../images/logo.jpg";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userRedux";
import {
  addProductsToCart,
  checkIsAdmin,
  deleteProductsFromCart,
  loginUser,
} from "../apiCalls";
import { removeProducts } from "../redux/cartRedux";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const quantity = useSelector((state) => state.cart.quantity);

  const [searchText, setSearchText] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchText) {
        navigate(`/products?search=${searchText}`);
      } else {
        navigate(`/products?allproducts=true`);
      }
    }
  };

  const logOut = () => {
    deleteCartProductsFromDatabase();
    saveCartProductsToDatabase();
    dispatch(logoutUser());
    dispatch(removeProducts());
  };

  const saveCartProductsToDatabase = async () => {
    try {
      await addProductsToCart(user.token, user.id, cart.products);
    } catch (error) {
      console.error("Error saving cart products to database:", error);
    }
  };

  const deleteCartProductsFromDatabase = async () => {
    try {
      await deleteProductsFromCart(user.token, user.id);
    } catch (error) {
      console.error("Error deleting cart products from database:", error);
    }
  };

  const navbarCheckIsAdmin = async (token) => {
    const adminRes = await checkIsAdmin(token);
    return adminRes.data.isAdmin;
  };

  navbarCheckIsAdmin(user.token);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const isAdmin = await navbarCheckIsAdmin(user.token);
        setIsAdmin(isAdmin);
      } catch (error) {
        console.log("Error checking admin role:", error);
      }
    };

    if (user.token) {
      checkAdminRole();
    }
  }, [user.token]);

  
  let conditionalUserData;

  if (user.token) {
    if (isAdmin) {
      conditionalUserData = (
        <>
          <Link to="/admin" className="navbar_link">
            Pagina Admin
          </Link>
          <Link to={`/user/${user.id}`} className="navbar_user_profile_link">
            {user.img ? (
              <img src={user.img} className="navbar_image"></img>
            ) : (
              <AccountCircleIcon />
            )}
            {user.name}
          </Link>
          <button onClick={logOut} className="navbar_btn">
            Log Out
          </button>
        </>
      );
    } else {
      conditionalUserData = (
        <>
          <Link to={`/user/${user.id}`} className="navbar_user_profile_link">
            {user.img ? (
              <img src={user.img} className="navbar_image"></img>
            ) : (
              <AccountCircleIcon />
            )}
            {user.name}
          </Link>
          <button onClick={logOut} className="navbar_btn">
            Log Out
          </button>
        </>
      );
    }
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
    <div className="navbar_container">
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
              to={searchText ? `/products/?search=${searchText}` : "/products?allproducts=true"}
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
    </div>
  );
};

export default NavBar;
