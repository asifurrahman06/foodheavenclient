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
            <Nav.Link onClick={() => navigate("/CustomerOrderHistory")}>
              Ordered Food
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

function CartBox({
  cartItems,
  removeFromCart,
  confirmOrder,
  handleIncreaseDecrease,
}) {
  const [count, setCount] = useState(cartItems.quantity);

  const handleQuantityChange = async (newCount) => {
    setCount(newCount);
    // Call handleIncreaseDecrease function when quantity is changed
    await handleIncreaseDecrease(cartItems._id, newCount);
  };

  function count_inc() {
    handleQuantityChange(count + 1);
  }

  function count_dec() {
    if (count === 1) {
      return;
    } else {
      handleQuantityChange(count - 1);
    }
  }

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
          <h3 className="pricedesc">Price: {cartItems.foodPrice} Taka</h3>
        </div>
        <div className="amountBtn">
          <Button variant="info" onClick={count_dec}>
            -
          </Button>
          <span className="quantityValue">{count}</span>
          <Button variant="info" onClick={count_inc}>
            +
          </Button>
          <Button
            variant="danger"
            onClick={() => removeFromCart(cartItems._id)}
          >
            Remove
          </Button>{" "}
          <Button
            variant="success"
            onClick={() => confirmOrder(cartItems._id, count)}
          >
            Confirm Order
          </Button>{" "}
        </div>
      </div>
      <h3 className="totalPrice">
        Subtotal: {cartItems.foodPrice * count} Taka
      </h3>
    </div>
  );
}

function Cart() {
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
        (item) => !item.confirmedOrder
      );
      setCartItems(filteredCartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const confirmOrder = async (_id, count) => {
    try {
      const userEmail = localStorage.getItem("email");
      console.log("userEmail:", userEmail); // Log the userEmail
      // Assuming userEmail is correctly retrieved and is a valid email
      console.log("_id before axios request:", _id); // Log the _id

      const response = await axios.put(
        `https://foodheavenserver.onrender.com/${_id}`,
        {
          email: userEmail,
          quantity: count,
        }
      );
      console.log("Response from axios:", response);
      navigate("/CustomerOrderHistory");

      if (response.status === 200) {
        const updatedCart = cartItems.filter((item) => item._id !== _id);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));

        // Update state to remove the confirmed item
        setCartItems(updatedCart);

        toast.success("Order confirmed successfully!");
      } else {
        toast.error("Error confirming order.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);

      toast.error("Error confirming order.");
    }
  };

  const handleIncreaseDecrease = async (_id, count) => {
    try {
      const userEmail = localStorage.getItem("email");

      const response = await axios.put(
        `https://foodheavenserver.onrender.com/${_id}`,
        {
          email: userEmail,
          quantity: count,
        }
      );

      if (response.status === 200) {
        const updatedCart = cartItems.map((item) =>
          item._id === _id ? { ...item, quantity: count } : item
        );
        setCartItems(updatedCart);
        toast.success("Quantity updated successfully.");
      } else {
        toast.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while updating quantity.");
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, cartItems) => total + cartItems.foodPrice * cartItems.quantity,
    0
  );

  // Inside your component or a utility file if you prefer
  const removeFromCart = async (_id) => {
    const email = localStorage.getItem("email");

    // Check for email existence
    if (!email) {
      console.error("Email is required for this operation.");
      return;
    }

    try {
      const response = await fetch(
        `https://foodheavenserver.onrender.com/removeFromCart/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Include authorization headers if needed
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Remove the item from the local state and localStorage as well
        const updatedCart = cartItems.filter((item) => item._id !== _id);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      } else {
        // Handle errors
        console.error("Failed to remove the item from the cart:", data.error);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const confirmAllOrders = async () => {
    try {
      if (!email) {
        // Handle case when user email is not available
        toast.error("User email is not available.");
        return;
      }

      // Send a PUT request to confirm all orders
      const response = await axios.put(
        `https://foodheavenserver.onrender.com/confirmAllOrders/${email}`
      );

      if (response.status === 200) {
        // Clear the cart by setting cartItems to an empty array
        setCartItems([]);

        // Clear the cart in local storage
        localStorage.removeItem("cartItems");

        // Optionally, display a success message to the user
        toast.success("All orders confirmed successfully!");
        navigate("/CustomerOrderHistory");
      } else {
        // Handle unsuccessful confirmation (e.g., server error)
        // Optionally, display an error message to the user
        toast.error("Error confirming all orders.");
      }
    } catch (error) {
      console.error("Error confirming all orders:", error);

      // Optionally, display an error message to the user
      toast.error("Error confirming all orders.");
    }
  };

  return (
    <div className="cartPage">
      <Header />
      <div className="cartBody">
        <div className="Cart">
          {cartItems.length === 0 ? (
            <Button variant="primary" className="fakaCart" disabled>
              Nothing on cart. Please add food to your cart to order
            </Button>
          ) : (
            <>
              {cartItems.map((cartItem) => (
                <CartBox
                  key={cartItem._id}
                  cartItems={cartItem}
                  removeFromCart={removeFromCart}
                  confirmOrder={confirmOrder}
                  handleIncreaseDecrease={handleIncreaseDecrease}
                />
              ))}

              <h6 className="warning">
                *You need to pay more 40 tk as delivery fee for each delivery.
                Each delivery includes all order from a single kitchen
              </h6>
              <Button
                variant="primary"
                className="confirmAllButton"
                onClick={confirmAllOrders}
              >
                Confirm All Orders
              </Button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
