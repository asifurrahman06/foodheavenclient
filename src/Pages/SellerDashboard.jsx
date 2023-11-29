import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import "./SellerDashboard.css";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Navbar,
  Nav,
} from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("type");

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Redirect to the login page
    navigate("/Log_in");
  };

  return (
    <Navbar
      bg="crimson"
      variant="dark"
      expand="lg"
      sticky="top"
      className="w-100%"
    >
      <Navbar.Brand onClick={() => navigate("/Home")} className="foodHaven">
        FoodHeaven
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isLoggedIn && (
            <Nav.Link onClick={() => navigate("/Profile_info_update")}>
              Profile
            </Nav.Link>
          )}
          {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          {isLoggedIn && (
            <Nav.Link onClick={() => navigate("/Seller_Upload_Menu")}>
              Upload Food
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function Footer() {
  return (
    <footer className="unique-footer">
      <Container fluid>
        <Row className="footer-content">
          <Col sm={4} className="footer-contact">
            <h5>Contact Information</h5>
            <div>
              <i className="fas fa-map-marker-alt"></i> CSE-21, MIST
            </div>
            <div>
              <i className="fas fa-envelope"></i> foodheaven@gmail.com
            </div>
          </Col>
          <Col sm={4} className="footer-social">
            <h5>Connect With Us</h5>
            <div>
              <a href="https://www.instagram.com">
                <i className="fab fa-instagram"></i>Instagram
              </a>
              <br></br>
              <a href="https://www.twitter.com">
                <i className="fab fa-twitter"></i>Twitter{" "}
              </a>
              <br></br>
              <a href="https://www.facebook.com">
                <i className="fab fa-facebook-f"> </i>Facebook
              </a>
            </div>
          </Col>
          <Col sm={4} className="footer-rights">
            <h5>&nbsp;</h5>
            <div>Copyright ©Group-6. All rights preserved.</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

const SellerDashboard = () => {
  const [uploadedFoods, setUploadedFoods] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const email = localStorage.getItem("email");

  useEffect(() => {
    console.log(uploadedFoods);
  }, [uploadedFoods]);

  useEffect(() => {
    const fetchUploadedFoods = async () => {
      try {
        const response = await axios.get(
          `https://foodheavenserver.onrender.com/seller/foods/${email}`
        );
        setUploadedFoods(response.data);
      } catch (error) {
        console.error("Error fetching uploaded foods:", error);
      }
    };

    if (email) {
      fetchUploadedFoods();
    }
  }, [email]);

  const handleViewOrders = async (foodId) => {
    try {
      const selectedFood = uploadedFoods.find((f) => f._id === foodId);
      if (!selectedFood) {
        console.error("Food item not found.");
        // Handle this case, e.g., show an error message to the user
        return;
      }

      const response = await axios.get(
        `https://foodheavenserver.onrender.com/seller/orders/${foodId}`
      );
      console.log(response.data);
      const orders = response.data.map((order) => ({
        foodItem: {
          name: order.foodItem.name,
          address: order.foodItem.address,
          phoneNumber: order.foodItem.phoneNumber,
          quantity: order.foodItem.quantity,
          foodPrice: order.foodItem.foodPrice,
          foodId: order.foodItem.foodId,
          sentToRider: order.foodItem.sentToRider,
          _id: order.foodItem._id,
          riderPhoneNumber: order.foodItem.riderPhoneNumber,
          confirmedDelivery: order.foodItem.confirmedDelivery,
        },
        foodName: order.foodName,
      }));

      setSelectedOrders(orders);
      setIsModalOpen(true);
    } catch (error) {
      toast.info("No order yet");
      console.error("Error fetching orders from server:", error);

      // Handle error here, e.g., set an error state
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="sellerDashboardPage">
      <Header />
      <div className="seller-dashboard-container">
        <h2 className="dashboard-heading">Dashboard</h2>
        <div className="uploaded-foods-container">
          {uploadedFoods.map((food) => (
            <div key={food._id} className="food-item">
              <img
                className="food-image"
                src={`https://foodheavenserver.onrender.com/${food.foodPicture}`}
                alt={food.foodName}
              />
              <div className="food-details">
                <h3 className="food-name">{food.foodName}</h3>
                <p className="food-description">{food.foodDescription}</p>
                <p className="food-price">Price: {food.foodPrice} Taka</p>
                <p className="food-category">Category: {food.foodCategory}</p>
                <p className="food-category">
                  Last Time for Order: {food.lastOrderTime} hour
                </p>
                <button
                  className="view-orders-button"
                  onClick={() => handleViewOrders(food._id)}
                >
                  View Confirmed Orders
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <Modal data={selectedOrders} onClose={handleCloseModal} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
