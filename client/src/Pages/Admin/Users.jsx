import "./Users.css";

import { useEffect, useState } from "react";
import { addUser, getUsers } from "../../apiCalls";
import { useSelector } from "react-redux";
import ExpandableUser from "./ExpandableUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosError, setAxiosError] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    judet: "",
    oras: "",
    address: "",
    img: "",
    number: "",
  });
  const logedInUser = useSelector((state) => state.user);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers(logedInUser.token);
      const { success, message, data } = response.data;

      if (success === 1) {
        setUsers(data);
      } else {
        setAxiosError(message);
      }
    } catch (error) {
      setAxiosError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [logedInUser.token]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log(newUser);
    await addUser(logedInUser.token, newUser);
    await fetchUsers();
  };

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {
            <div className="users_add_container">
              <h2>Adauga User</h2>
              <form className="users_add_form">
                <div className="users_input_container">
                  <label htmlFor="name" className="users_label">
                    Nume:
                  </label>
                  <input
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    id="name"
                    name="name"
                    className="users_input"
                  ></input>
                </div>
                <div className="users_input_container">
                  <label htmlFor="email" className="users_label">
                    Email:
                  </label>
                  <input
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }))
                    }
                    id="email"
                    name="email"
                    className="users_input"
                  ></input>
                </div>
                <div className="users_input_container">
                  <label htmlFor="password" className="users_label">
                    Passsword:
                  </label>
                  <input
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                      }))
                    }
                    id="password"
                    name="password"
                    className="users_input"
                  ></input>
                </div>
                <div className="users_input_container">
                  <label htmlFor="judet" className="users_label">
                    Judet:
                  </label>
                  <input
                    value={newUser.judet}
                    onChange={(e) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        judet: e.target.value,
                      }))
                    }
                    id="judet"
                    name="judet"
                    className="users_input"
                  ></input>
                </div>
                <div className="users_input_container">
                  <label htmlFor="oras" className="users_label">
                    Oras:
                  </label>
                  <input
                    value={newUser.oras}
                    onChange={(e) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        oras: e.target.value,
                      }))
                    }
                    id="oras"
                    name="oras"
                    className="users_input"
                  ></input>
                </div>
                <div className="users_input_container">
                  <label htmlFor="address" className="users_label">
                    Adresa:
                  </label>
                  <input
                    value={newUser.address}
                    onChange={(e) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        address: e.target.value,
                      }))
                    }
                    id="address"
                    name="address"
                    className="users_input"
                  ></input>
                </div>
                <div className="users_input_container">
                  <label htmlFor="img" className="users_label">
                    Imagine:
                  </label>
                  <input
                    value={newUser.img}
                    onChange={(e) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        img: e.target.value,
                      }))
                    }
                    id="img"
                    name="img"
                    className="users_input"
                  ></input>
                </div>
                <div className="users_input_container">
                  <label htmlFor="number" className="users_label">
                    Numar Telefon:
                  </label>
                  <input
                    value={newUser.number}
                    onChange={(e) =>
                      setNewUser((prevState) => ({
                        ...prevState,
                        number: e.target.value,
                      }))
                    }
                    id="number"
                    name="number"
                    className="users_input"
                  ></input>
                </div>
                <div className="users_input_container">
                  <label htmlFor="role" className="users_label">
                    Rol:{" "}
                  </label>
                  <select
                    name="role"
                    id="role"
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="users_input"
                  >
                    <option
                      value="admin"
                    >
                      Admin
                    </option>
                    <option
                      value="customer"
                    >
                      Customer
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  onClick={handleAddUser}
                  className="users_confirm_btn"
                >
                  Adauga User
                </button>
              </form>
            </div>
          }
          {users.map((user, index) => (
            <ExpandableUser user={user} key={index} fetchUsers={fetchUsers} />
          ))}
        </>
      )}
    </>
  );
};

export default Users;
