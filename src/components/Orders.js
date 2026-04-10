import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/orders/${user_id}/`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [user_id]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">🧾 Order History</h3>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Payment ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>₹{o.amount}</td>
                <td>{o.payment_id}</td>
                <td>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;