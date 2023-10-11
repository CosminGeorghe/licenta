import "./ExpandableOrder.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getOrders, setOrderStatus } from "../../apiCalls";
import { Link } from "react-router-dom";

const ExpandableOrder = ({ order, fetchOrders }) => {
  const [expanded, setExpanded] = useState(false);
  const logedInUser = useSelector((state) => state.user);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSetPending = async (e) => {
    e.preventDefault();
    await setOrderStatus(logedInUser.token, order.id, {
      status: "In Procesare",
    });
    await fetchOrders();
  };

  const handleSetWaitingDelivery = async (e) => {
    e.preventDefault();
    await setOrderStatus(logedInUser.token, order.id, {
      status: "Asteapta Livrare",
    });
    await fetchOrders();
  };

  const handleSetDelivering = async (e) => {
    e.preventDefault();
    await setOrderStatus(logedInUser.token, order.id, {
      status: "In Curs De Livrare",
    });
    await fetchOrders();
  };

  const handleSetDelivered = async (e) => {
    e.preventDefault();
    await setOrderStatus(logedInUser.token, order.id, { status: "Livrata" });
    await fetchOrders();
  };

  let orderBackgroundColor;
  console.log(order.status);
  switch (order.status) {
    case "In Procesare":
      orderBackgroundColor = "#ca1a23";
      break;
    case "Asteapta Livrare":
      orderBackgroundColor = "#d8a910";
      break;
    case "In Curs De Livrare":
      orderBackgroundColor = "#0cccfc";
      break;
    case "Livrata":
      orderBackgroundColor = "#15e9ad";
      break;
    default:
  }

  const notExpandedContent = (
    <div className="order_not-expanded_container">
      <p className="order_not-expanded_container_item">
        Numar Comanda: {order.id}
      </p>
      <p className="order_not-expanded_container_item">
        ID User: {order.user_id}
      </p>
      <p className="order_not-expanded_container_item">
        Status: {order.status}
      </p>
      <button onClick={toggleExpand} className="order_not-expanded_expand_btn">
        <KeyboardArrowDownIcon />
      </button>
    </div>
  );

  const expandedContent = (
    <div className="order_expanded_container">
      <button onClick={toggleExpand} className="order_expanded_expand_btn">
        <KeyboardArrowUpIcon />
      </button>
      <p className="order_expanded_label">Numar Comanda: {order.id}</p>
      <p className="order_expanded_label">ID User: {order.user_id}</p>
      <p className="order_expanded_label">Nume: {order.name}</p>
      <p className="order_expanded_label">Numar Telefon: {order.number}</p>
      <p className="order_expanded_label">Judet: {order.judet}</p>
      <p className="order_expanded_label">Oras: {order.oras}</p>
      <p className="order_expanded_label">Adresa: {order.address}</p>
      <p className="order_expanded_label">Total: {order.total}</p>
      <p className="order_expanded_label">Produse:</p>
      {order.products.map((product) => (
        <Link to={`/product/${product.product.id}`} className="navbar_link">
          <p htmlFor="price" className="order_expanded_label">
            {product.product.title} * {product.quantity} ={" "}
            {product.product.price * product.quantity}
          </p>{" "}
        </Link>
      ))}
      <p htmlFor="price" className="order_expanded_label">
        Status: {order.status}
      </p>
      <div>
        <button
          type="submit"
          onClick={handleSetPending}
          className="pending_btn"
        >
          Seteaza In Procesare
        </button>
        <button
          type="submit"
          onClick={handleSetWaitingDelivery}
          className="waiting_btn"
        >
          Seteaza Asteapta Livrare
        </button>
        <button
          type="submit"
          onClick={handleSetDelivering}
          className="delivering_btn"
        >
          Seteaza In Curs De Livrare
        </button>
        <button
          type="submit"
          onClick={handleSetDelivered}
          className="delviered_btn"
        >
          Seteaza Livrata
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="expandableorder_container"
      style={{ backgroundColor: orderBackgroundColor }}
    >
      {expanded ? expandedContent : notExpandedContent}
    </div>
  );
};

export default ExpandableOrder;
