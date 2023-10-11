import React, { useState } from "react";
import "./ExpandableUser.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { deleteUser, updatePasswordAdmin, updateUser } from "../../apiCalls";
import { useSelector } from "react-redux";

const ExpandableUser = ({ user, fetchUsers }) => {
  const [expanded, setExpanded] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [newPassword, setNewPassword] = useState({ password: "" });
  const reduxUser = useSelector((state) => state.user);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await updateUser(reduxUser.token, updatedUser.id, updatedUser);
    fetchUsers();
  };

  const handleResetUser = (e) => {
    e.preventDefault();
    setUpdatedUser(user);
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    await deleteUser(reduxUser.token, updatedUser.id);
    fetchUsers();
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    updatePasswordAdmin(reduxUser.token, updatedUser.id, newPassword);
    fetchUsers();
  };

  const notExpandedContent = (
    <div className="user_not-expanded_container">
      <p className="user_not-expanded_container_item">nume: {user.name}</p>
      <p className="user_not-expanded_container_item">email: {user.email}</p>
      <button onClick={toggleExpand} className="user_not-expanded_expand_btn">
        <KeyboardArrowDownIcon />
      </button>
    </div>
  );

  const expandedContent = (
    <>
      <form className="user_expanded_container">
        <button onClick={toggleExpand} className="user_expanded_expand_btn">
          <KeyboardArrowUpIcon />
        </button>
        <div className="user_expanded_label_input_container">
          <label htmlFor="name" className="user_expanded_label">
            Nume:
          </label>
          <input
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            id="name"
            name="name"
            className="user_expanded_input"
          ></input>
        </div>
        <div className="user_expanded_label_input_container">
          <label htmlFor="email" className="user_expanded_label">
            Email:
          </label>
          <input
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            id="email"
            name="email"
            className="user_expanded_input"
          ></input>
        </div>
        <div className="user_expanded_label_input_container">
          <label htmlFor="judet" className="user_expanded_label">
            Judet:
          </label>
          <input
            value={updatedUser.judet}
            onChange={(e) =>
              setUpdatedUser((prevState) => ({
                ...prevState,
                judet: e.target.value,
              }))
            }
            id="judet"
            name="judet"
            className="user_expanded_input"
          ></input>
        </div>
        <div className="user_expanded_label_input_container">
          <label htmlFor="oras" className="user_expanded_label">
            Oras:
          </label>
          <input
            value={updatedUser.oras}
            onChange={(e) =>
              setUpdatedUser((prevState) => ({
                ...prevState,
                oras: e.target.value,
              }))
            }
            id="oras"
            name="oras"
            className="user_expanded_input"
          ></input>
        </div>
        <div className="user_expanded_label_input_container">
          <label htmlFor="address" className="user_expanded_label">
            Adresa:
          </label>
          <input
            value={updatedUser.address}
            onChange={(e) =>
              setUpdatedUser((prevState) => ({
                ...prevState,
                address: e.target.value,
              }))
            }
            id="address"
            name="address"
            className="user_expanded_input"
          ></input>
        </div>
        <div className="user_expanded_label_input_container">
          <label htmlFor="img" className="user_expanded_label">
            Imagine:
          </label>
          <input
            value={updatedUser.img}
            onChange={(e) =>
              setUpdatedUser((prevState) => ({
                ...prevState,
                img: e.target.value,
              }))
            }
            id="img"
            name="img"
            className="user_expanded_input"
          ></input>
        </div>
        <div className="user_expanded_label_input_container">
          <label htmlFor="number" className="user_expanded_label">
            Numar telefon:
          </label>
          <input
            value={updatedUser.number}
            onChange={(e) =>
              setUpdatedUser((prevState) => ({
                ...prevState,
                number: e.target.value,
              }))
            }
            id="number"
            name="number"
            className="user_expanded_input"
          ></input>
        </div>
        <div className="user_expanded_label_input_container">
          <label htmlFor="role" className="user_expanded_label">
            Rol:{" "}
          </label>
          <select
            name="role"
            id="role"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, role: e.target.value })
            }
            className="user_expanded_input"
            value={updatedUser.role}
          >
            <option value="admin">
              Admin
            </option>
            <option value="customer">
              Customer
            </option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleUpdateUser}
            className="user_expanded_confirm_btn"
          >
            Actualizeaza Userul
          </button>
          <button
            type="submit"
            onClick={handleResetUser}
            className="user_expanded_reset_btn"
          >
            Reseteaza valorile
          </button>
          <button
            type="submit"
            onClick={handleDeleteUser}
            className="user_expanded_delete_btn"
          >
            Sterge Userul
          </button>
        </div>
      </form>
      <form className="user_expanded_container">
        <div className="user_expanded_label_input_container">
          <label htmlFor="current_password" className="user_expanded_label">
            Parola actuala:
          </label>
          <input
            value={updatedUser.password}
            id="current_password"
            name="current_password"
            className="user_expanded_input"
          ></input>
        </div>
        <div className="user_expanded_label_input_container">
          <label htmlFor="new_password" className="user_expanded_label">
            Parola noua:
          </label>
          <input
            value={newPassword.password}
            id="current_password"
            name="current_password"
            className="user_expanded_input"
            onChange={(e) =>
              setNewPassword((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          ></input>
        </div>
        <button
          type="submit"
          onClick={handleUpdatePassword}
          className="user_expanded_confirm_btn"
        >
          Actualizeaza Parola
        </button>
      </form>
    </>
  );
  return (
    <div className="expandableuser_container">
      <div></div>
      {expanded ? expandedContent : notExpandedContent}
    </div>
  );
};

export default ExpandableUser;
