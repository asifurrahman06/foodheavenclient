import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import "./RiderDashboard.css";
import { Card, Navbar, Nav } from "react-bootstrap";
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

function RiderDashboard() {
  const [orders, setOrders] = useState([]);
  const riderEmail = localStorage.getItem("email");
  const [isActive, setIsActive] = useState(true); // Assuming the default is true

  // Toggle the active status
  const toggleActiveStatus = () => {
    setIsActive(!isActive);
    updateActiveStatus(!isActive);
  };

  // Call to backend API to update the active status
  const updateActiveStatus = (newStatus) => {
    axios
      .put(`https://foodheavenserver.onrender.com/api/rider/update-status`, {
        email: riderEmail,
        activeStatus: newStatus,
      })
      .then((response) => {
        // Handle success
        console.log("Status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  useEffect(() => {
    // Fetch orders from the server based on riderEmail
    fetchOrders(riderEmail);
  }, [riderEmail]); // The dependency array now includes riderEmail to refetch if it changes

  const fetchOrders = (riderEmail) => {
    axios
      .get(`https://foodheavenserver.onrender.com/api/rider/orders/${riderEmail}`)
      .then((response) => {
        setOrders(response.data.orders); // Update to match the data structure from backend
      })
      .catch((error) => {
        console.error("Error fetching orders for rider:", error);
      });
  };

  const handleConfirmDelivery = (orderId) => {
    axios
      .post(`https://foodheavenserver.onrender.com/api/rider/confirm-delivery`, { orderId })
      .then((response) => {
        // Handle successful confirmation
        toast.success("Delivery confirmed!");
      })
      .catch((error) => {
        // Handle error
        console.error("Error confirming delivery:", error);
      });
  };

  return (
    <div className="riderDashboardPage">
      <Header />
      <Container className="rider-dashboard-container mt-5">
        <Row>
          <Col md={12}>
            <h2 className="text-center">Rider Dashboard</h2>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* Checkbox or Slider to show and toggle the active status */}
            <h6>*If you are online, only then you are going to get orders</h6>
            {isActive && (
              <Form.Check
                type="switch"
                id="active-status-toggle"
                label="Online"
                checked={isActive}
                onChange={toggleActiveStatus}
              />
            )}
            {!isActive && (
              <Form.Check
                type="switch"
                id="active-status-toggle"
                label="Offline"
                checked={isActive}
                onChange={toggleActiveStatus}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3>Assigned Orders:</h3>
            <ListGroup>
              {orders.map((order) => (
                <ListGroup.Item key={order.orderId} className="mb-3">
                  <p>
                    <strong>Food Name:</strong> {order.foodName}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Total Bill:</strong>{" "}
                    {order.quantity * order.foodPrice}
                  </p>
                  <p>
                    <strong>Customer Name:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Customer Address:</strong> {order.customerAddress}
                  </p>
                  <p>
                    <strong>Customer Phone:</strong> {order.customerPhone}
                  </p>
                  <p>
                    <strong>Seller Address:</strong> {order.sellerAddress}
                  </p>
                  <p>
                    <strong>Seller Phone:</strong> {order.sellerPhone}
                  </p>
                  {!order.confirmedDelivery && (
                    <Button
                      variant="success"
                      onClick={() => handleConfirmDelivery(order.orderId)}
                    >
                      Confirm Delivery
                    </Button>
                  )}
                  {order.confirmedDelivery && (
                    <Button variant="success" disabled>
                      Delivery Confirmed
                    </Button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default RiderDashboard;
