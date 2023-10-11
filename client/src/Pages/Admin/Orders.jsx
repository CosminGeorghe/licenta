import "./Orders.css";

import { useEffect, useState } from "react";
import { getOrders } from "../../apiCalls";
import { useSelector } from "react-redux";
import ExpandableOrder from "./ExpandableOrder";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const logedInUser = useSelector((state) => state.user);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders(logedInUser.token);
      const sortedOrders = response.data.data.sort((a, b) => {
        const statusOrder = [
          "In Procesare",
          "Asteapta livrare",
          "In Curs De Livrare",
          "Livrata",
        ];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });
      setOrders(sortedOrders);
      console.log(sortedOrders)
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {" "}
          {orders.map((order) => (
            <ExpandableOrder
              order={order}
              key={order.id}
              fetchOrders={fetchOrders}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Orders;
