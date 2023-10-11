import "./index.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkIsAdmin } from "../../apiCalls";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Users from "./Users";
import Products from "./Products";
import Categories from "./Categories";
import Subcategories from "./Subcategories";
import Orders from "./Orders";

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState();
  const [axiosError, setAxiosError] = useState();
  const [adminContent, setAdminContent] = useState(<Users />); 

  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        setLoading(true);
        const response = await checkIsAdmin(user.token);
        const { success, message } = response.data;

        if (response.data.isAdmin === true) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setAxiosError(message);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIsAdmin();
  }, [user]);

  return (
    <>
      {loading && <p>Loading</p>}
      {!isAdmin ? (
        <p>{axiosError}</p>
      ) : (
        <div className="admin_main-container">
          {" "}
          <div className="admin_dashboard">
            <h2 className="admin_dashboard_title">Admin Dashboard</h2>
            <button
              onClick={() => setAdminContent(<Users />)}
              className="admin_dashboard_btn"
            >
              <ManageAccountsIcon /> Useri
            </button>
            <button
              onClick={() => setAdminContent(<Products />)}
              className="admin_dashboard_btn"
            >
              {" "}
              <InventoryIcon />
              Produse
            </button>
            <button
              onClick={() => setAdminContent(<Categories />)}
              className="admin_dashboard_btn"
            >
              {" "}
              <CategoryIcon />
              Categorii
            </button>
            <button
              onClick={() => setAdminContent(<Subcategories />)}
              className="admin_dashboard_btn"
            >
              {" "}
              <CategoryIcon />
              Subcategorii
            </button>
            <button
              onClick={() => setAdminContent(<Orders />)}
              className="admin_dashboard_btn"
            >
              {" "}
              <LocalShippingIcon />
              Comenzi
            </button>
          </div>
          <div className="admin_content">{adminContent}</div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
