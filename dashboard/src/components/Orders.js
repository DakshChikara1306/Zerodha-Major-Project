import React, { useEffect, useState } from "react";
import api from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="no-orders">
        <p>You haven't placed any orders</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.name}</td>
                <td>{o.qty}</td>
                <td>{o.price}</td>
                <td>{o.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
