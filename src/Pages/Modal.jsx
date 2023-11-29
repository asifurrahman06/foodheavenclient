import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Modal.css";
import axios from "axios";
import { toast } from "react-toastify";

const Modal = ({ data, onClose }) => {
  const [orders, setOrders] = useState(
    data.map((order) => ({
      ...order,
      sentToRider: order.sentToRider || false,
    }))
  );

  if (!Array.isArray(data)) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Error</h2>
          <p>Invalid data format</p>
        </div>
      </div>
    );
  }

  const handleAssignToRider = async (order, showToast = true) => {
    if (order.sentToRider) {
      if (showToast) toast.error("Order is already assigned.");
      return;
    }
    const sellerEmail = localStorage.getItem("email");
    try {
      const response = await axios.put(
        `https://foodheavenserver.onrender.com/assignOrderToRider/${order.foodItem._id}`,
        { sellerEmail }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.foodItem._id === order.foodItem._id
              ? { ...o, sentToRider: true }
              : o
          )
        );
        if (showToast) toast.success("Order assigned to rider successfully.");
      } else {
        if (showToast) toast.error("Error assigning order.");
      }
    } catch (error) {
      if (showToast)
        toast.error("Error assigning order to rider: " + error.message);
    }
  };

  const handleSendToRiderAll = async () => {
    try {
      for (const order of orders) {
        if (!order.sentToRider) {
          await handleAssignToRider(order, false);
        }
      }
      toast.success("All orders have been assigned to riders.");
    } catch (error) {
      toast.error("Error assigning orders to rider: " + error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Confirmed Orders</h2>
        <ul>
          {orders.map((order) => (
            <div key={order.foodItem._id} className="order-item">
              <strong>Customer Name:</strong> {order.foodItem.name} <br />
              <strong>Quantity:</strong> {order.foodItem.quantity} <br />
              <strong>Food Price:</strong> {order.foodItem.foodPrice} <br />
              <strong>Total bill:</strong>{" "}
              {order.foodItem.quantity * order.foodItem.foodPrice} <br />
              <strong>Customer Address:</strong> {order.foodItem.address} <br />
              <strong>Customer Phone Number:</strong>{" "}
              {order.foodItem.phoneNumber} <br />
              <strong>Rider Phone number:</strong>{" "}
              {order.foodItem.riderPhoneNumber} <br />
              <hr />
              {order.foodItem.sentToRider === true &&
                order.foodItem.confirmedDelivery === false && (
                  <button disabled>Assigned to rider</button>
                )}
              {order.foodItem.sentToRider === true &&
                order.foodItem.confirmedDelivery === true && (
                  <button disabled>Delivered order successfully</button>
                )}
              {order.foodItem.sentToRider === false && (
                <button onClick={() => handleAssignToRider(order)}>
                  Assign to rider
                </button>
              )}
            </div>
          ))}
        </ul>

        <button className="assign-to-rider-all" onClick={handleSendToRiderAll}>
          Assign to Rider All Orders
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      foodName: PropTypes.string.isRequired,
      foodItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        foodPrice: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        sentToRider: PropTypes.bool,
        riderPhoneNumber: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
