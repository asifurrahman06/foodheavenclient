import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MapComponent from "./MapComponent";
import "./AddressModal.css";

function AddressModal({ show, handleClose, onConfirm }) {
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);

  const handleConfirm = () => {
    onConfirm(address);
    setAddress(""); // Clear the address input field after confirming
    handleClose(); // Close the modal after confirming
  };

  const handleUseMap = () => {
    setShowMap(!showMap); // Toggle map view
  };

  // This function will stop propagation to ensure that clicks within the modal don't close it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Your Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showMap ? (
          <div>
            <MapComponent />
            <Button variant="secondary" onClick={() => setShowMap(false)}>
              Close Map
            </Button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter your address manually"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button variant="primary" onClick={handleUseMap}>
              Use Google Maps
            </Button>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm Address
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddressModal;
