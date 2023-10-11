import { useDispatch, useSelector } from "react-redux";
import "./User.css";
import { useLocation } from "react-router-dom";
import {
  getUserOrders,
  getUserAccountDetails,
  getUserAddressDetails,
  updateUserAccountDetails,
  updateUserAddressDetails,
  updatePasswordUser,
} from "../../apiCalls";
import { useEffect, useState } from "react";
import { updateUser } from "../../redux/userRedux";
import ExpandableOrder from "./ExpandableOrder";

const User = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    img: "",
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [addressData, setAddressData] = useState({
    judet: "",
    oras: "",
    address: "",
    number: "",
  });
  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    email: "",
    img: "",
  });
  const [updatedAddressData, setUpdatedAddressData] = useState({
    judet: "",
    oras: "",
    address: "",
    number: "",
  });

  const [passwordMessage, setpasswordMessage] = useState();
  const [passwordMessageColor, setpasswordMessageColor] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserAccountDetails = async () => {
      try {
        const response = await getUserAccountDetails(user.token, user.id);
        setUserData(response.data.data);
        setUpdatedUserData(response.data.data);
      } catch (error) {
        // Handle the error
        console.error("Error fetching user account details:", error);
      }
    };
    const fetchUserAddressDetails = async () => {
      try {
        const response = await getUserAddressDetails(user.token, user.id);
        setAddressData(response.data.data);
        setUpdatedAddressData(response.data.data);
      } catch (error) {
        // Handle the error
        console.error("Error fetching user account details:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await getUserOrders(user.token, user.id);
        setOrders(response.data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };
    setLoading(true);
    fetchUserAccountDetails();
    fetchUserAddressDetails();
    fetchOrders();
    setLoading(false);
  }, [user.token, user.id]);

  const handleConfirmUserData = (e) => {
    e.preventDefault();
    updateUserAccountDetails(user.token, user.id, updatedUserData);
    dispatch(updateUser(updatedUserData));
    setUserData(updatedUserData);
  };

  const handleResetUserData = (e) => {
    e.preventDefault(addressData);
    setUpdatedUserData(userData);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault(addressData);
    if(password.newPassword !== password.confirmPassword) {
      setpasswordMessage("Parolele nu se potrivesc");
    } else {
      const response = await updatePasswordUser(user.token, user.id, password);
      if(Number(response.data.success) === 0) {
        setpasswordMessage(response.data.message);
        setpasswordMessageColor("red")
      } else {
        setpasswordMessage("Parola actualizata cu succes");
        setpasswordMessageColor("green")

      }
    }
  };

  const handleConfirmAddressData = (e) => {
    e.preventDefault();
    updateUserAddressDetails(user.token, user.id, updatedAddressData);
    setAddressData(updatedAddressData);
  };

  const handleResetAddressData = (e) => {
    e.preventDefault(addressData);
    setUpdatedAddressData(addressData);
  };

  const userContent = (
    <div className="userpage_forms_container">
      <form className="userpage_user_form">
        <p>Date cont</p>
        <div className="userpage_label-input_container">
          <label htmlFor="nume" className="userpage_user_label">
            Nume:
          </label>
          <input
            className="userpage_user_input"
            id="nume"
            name="nume"
            value={updatedUserData && updatedUserData.name}
            onChange={(e) =>
              setUpdatedUserData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          ></input>
        </div>
        <div className="userpage_label-input_container">
          <label htmlFor="email" className="userpage_user_label">
            Email:
          </label>
          <input
            className="userpage_user_input"
            id="email"
            name="email"
            value={updatedUserData && updatedUserData.email}
            onChange={(e) =>
              setUpdatedUserData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          ></input>
        </div>
        <div className="userpage_label-input_container">
          <label htmlFor="imagine" className="userpage_user_label">
            Imagine:
          </label>
          <input
            className="userpage_user_input"
            id="imagine"
            name="imagine"
            value={updatedUserData && updatedUserData.img}
            onChange={(e) =>
              setUpdatedUserData((prevState) => ({
                ...prevState,
                img: e.target.value,
              }))
            }
          ></input>
        </div>
        <div className="userpage_buttons_container">
          <button
            className="userpage_cofirm_btn"
            type="submit"
            onClick={handleConfirmUserData}
          >
            Confirma
          </button>
          <button
            className="userpage_resetbtn"
            type="submit"
            onClick={handleResetUserData}
          >
            Reseteaza
          </button>
        </div>
      </form>

      <form onSubmit={handleUpdatePassword} className="userpage_user_form">
        <p>Schimba parola</p>
        <div className="userpage_label-input_container">
          <label htmlFor="parolaveche" className="userpage_user_label">
            Parola veche:
          </label>
          <input
            value={password.oldPassword}
            onChange={(e) =>
              setPassword((prevState) => ({
                ...prevState,
                oldPassword: e.target.value,
              }))
            }
            className="userpage_user_input"
            id="parolaveche"
            name="parolaveche"
            required
          ></input>
        </div>
        <div className="userpage_label-input_container">
          <label htmlFor="parolanoua" className="userpage_user_label">
            Parola noua:
          </label>
          <input
            value={password.newPassword}
            onChange={(e) =>
              setPassword((prevState) => ({
                ...prevState,
                newPassword: e.target.value,
              }))
            }
            className="userpage_user_input"
            id="parolanoua"
            name="parolanoua"
            required
          ></input>
        </div>
        <div className="userpage_label-input_container">
          <label htmlFor="confirmaparola" className="userpage_user_label">
            Confrima parola:
          </label>
          <input
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword((prevState) => ({
                ...prevState,
                confirmPassword: e.target.value,
              }))
            }
            className="userpage_user_input"
            id="confirmaparola"
            name="confirmaparola"
            required
          ></input>
        </div>
        {passwordMessage !== "" && <p style={{color: passwordMessageColor}}>{passwordMessage}</p>}
        <button type="submit" className="userpage_cofirm_btn">
          Confirma
        </button>
      </form>
      <p>Date adresa de livrare</p>
      <form className="userpage_user_form">
        <div className="userpage_label-input_container">
          <label htmlFor="judet" className="userpage_user_label">
            Judet:
          </label>
          <input
            className="userpage_user_input"
            id="judet"
            name="judet"
            value={updatedAddressData && updatedAddressData.judet}
            onChange={(e) =>
              setUpdatedAddressData((prevState) => ({
                ...prevState,
                judet: e.target.value,
              }))
            }
          ></input>
        </div>
        <div className="userpage_label-input_container">
          <label htmlFor="oras" className="userpage_user_label">
            Oras:
          </label>
          <input
            className="userpage_user_input"
            id="oras"
            name="oras"
            value={updatedAddressData && updatedAddressData.oras}
            onChange={(e) =>
              setUpdatedAddressData((prevState) => ({
                ...prevState,
                oras: e.target.value,
              }))
            }
          ></input>
        </div>
        <div className="userpage_label-input_container">
          <label htmlFor="adresa" className="userpage_user_label">
            Adresa:
          </label>
          <input
            className="userpage_user_input"
            id="adresa"
            name="adresa"
            value={updatedAddressData && updatedAddressData.address}
            onChange={(e) =>
              setUpdatedAddressData((prevState) => ({
                ...prevState,
                address: e.target.value,
              }))
            }
          ></input>
        </div>
        <div className="userpage_label-input_container">
          <label htmlFor="phone" className="userpage_user_label">
            Numar telefon:
          </label>
          <input
            className="userpage_user_input"
            id="phone"
            name="phone"
            value={updatedAddressData && updatedAddressData.number}
            onChange={(e) =>
              setUpdatedAddressData((prevState) => ({
                ...prevState,
                number: e.target.value,
              }))
            }
          ></input>
        </div>
        <div className="userpage_buttons_container">
          <button
            type="submit"
            className="userpage_cofirm_btn"
            onClick={handleConfirmAddressData}
          >
            Confirma
          </button>
          <button
            type="submit"
            className="userpage_resetbtn"
            onClick={handleResetAddressData}
          >
            Reseteaza
          </button>
        </div>
      </form>
      <div>
        {orders &&
          orders.map((order) => (
            <ExpandableOrder order={order} key={order.id} />
          ))}
      </div>
    </div>
  );
  return (
    <>
      {loading === true ? (
        <p>loading</p>
      ) : user.id != id ? (
        <p>Acces respins! Nu ai permisiunea</p>
      ) : (
        userContent
      )}
    </>
  );
};

export default User;
