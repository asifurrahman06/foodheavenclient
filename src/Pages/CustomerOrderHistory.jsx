import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import { toast } from "react-toastify";
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
            <Nav.Link onClick={() => navigate("/Find_food")}>
              Order Food
            </Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link onClick={() => navigate("/cart")}>
              <i className="fas fa-shopping-cart"></i> Cart
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

function CartBox({ cartItems }) {
  return (
    <div className="body">
      <div className="itemFrame">
        <img
          className="foodPic"
          src={`https://foodheavenserver.onrender.com/${cartItems.foodPicture}`}
        />{" "}
        {/* Display food picture */}
        <div className="details">
          <h3 className="food-title">{cartItems.sellerName}'s kitchen</h3>
          <h3 className="food-title">{cartItems.foodName}</h3>
          <h3 className="food-title">Quantity: {cartItems.quantity}</h3>
          <h3 className="pricedesc">Price: {cartItems.foodPrice} Taka</h3>
          <Button variant="success" className="OrderStatus" disabled>
            {cartItems.confirmedOrder === true &&
              cartItems.sentToRider === true &&
              cartItems.confirmedDelivery === false &&
              "Order Assigned to Rider"}
            {cartItems.confirmedOrder === true &&
              cartItems.sentToRider === true &&
              cartItems.confirmedDelivery === true &&
              "Order Delivered Successfully"}
            {cartItems.confirmedOrder === true &&
              cartItems.sentToRider === false &&
              cartItems.confirmedDelivery === false &&
              "Order Sent to Seller"}
          </Button>{" "}
        </div>
      </div>
      <h3 className="totalPrice">
        Subtotal: {cartItems.foodPrice * cartItems.quantity} Taka
      </h3>
    </div>
  );
}

function OrderHistory() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    // Fetch cart items from the server when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`https://foodheavenserver.onrender.com/cart/${email}`);
      // Filter out items where confirmed is true
      const filteredCartItems = response.data.filter(
        (item) => item.confirmedOrder
      );
      const reversedCartItems = filteredCartItems.reverse();
      const last20CartItems = reversedCartItems.slice(0, 20);
      setCartItems(last20CartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  return (
    <div className="cartPage">
      <Header />
      <div className="cartBody">
        <h6 className="warning">
          *You need to pay more 40 tk as delivery fee for each delivery. Each
          delivery includes all order from a single kitchen
        </h6>
        <div className="Cart">
          {cartItems.length === 0 ? (
            <Button variant="primary" className="fakaCart" disabled>
              No previous order available
            </Button>
          ) : (
            <>
              {cartItems.map((cartItem) => (
                <CartBox key={cartItem._id} cartItems={cartItem} />
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistory;
