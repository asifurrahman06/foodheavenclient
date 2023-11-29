// ViewConfirmedOrders.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewConfirmedOrders.css";

function ViewConfirmedOrders() {
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  useEffect(() => {
    const fetchConfirmedOrders = async () => {
      try {
        const response = await axios.get(
          "https://foodheavenserver.onrender.com/confirmedOrders"
        );
        // Ensure the response.data structure matches the expected format
        console.log("API Response:", response.data); // Log the response data for debugging
        setConfirmedOrders(response.data);
      } catch (error) {
        console.error("Error fetching confirmed orders:", error);
      }
    };

    fetchConfirmedOrders();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="confirmed-orders-container">
      <h2>Confirmed Orders</h2>
      <div className="confirmed-orders-list">
        {confirmedOrders.map((order) => (
          <div className="confirmed-order-item" key={order._id}>
            <img
              src={`https://foodheavenserver.onrender.com/${order.foodPicture}`}
              alt={order.foodName}
              className="order-item-image"
            />
            <div className="order-item-details">
              <h3>{order.foodName}</h3>
              <p>{order.foodDescription}</p>
              <p>Price: {order.foodPrice} Taka</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewConfirmedOrders;
