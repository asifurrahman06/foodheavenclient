import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Find_food.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
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
          {!isLoggedIn && (
            <Nav.Link onClick={() => navigate("/Log_in")}>Login</Nav.Link>
          )}
          {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          {!isLoggedIn && (
            <Nav.Link onClick={() => navigate("/Sign_up")}>Signup</Nav.Link>
          )}
          {isLoggedIn && (
            <Nav.Link onClick={() => navigate("/CustomerOrderHistory")}>
              Ordered Food
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

function FindFood() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`https://foodheavenserver.onrender.com/foods/${userEmail}`)
        .then((response) => {
          console.log(response.data);
          setFoods(response.data);
        })
        .catch((error) => {
          console.error("Error fetching food items:", error);
        });
    }
  }, [userEmail]);

  const addToCart = async (item) => {
    try {
      const isLoggedIn = localStorage.getItem("type");
      if (isLoggedIn) {
        const userEmail = localStorage.getItem("email");
        const { food, sellerName } = item;
        const { _id, foodName, foodPicture, foodPrice } = food;

        const response = await axios.post("https://foodheavenserver.onrender.com/addToCart", {
          email: userEmail,
          foodId: _id,
          quantity: 1,
          foodName,
          foodPicture,
          foodPrice,
          confirmedOrder: false,
          sellerName,
        });

        if (response.status === 200) {
          toast.success("Added to cart successfully");
          console.log(food.sellerName);
        } else {
          toast.error("Failed to add item to cart");
        }
      } else {
        toast.error("You must log in first");
        navigate("/Log_in");
      }
    } catch (error) {
      console.error("Error adding item to cart: ", error);
      const errorMessage =
        error.response?.data?.error || "Failed to add item to cart";
      toast.error(errorMessage);
    }
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearchTerm = food.food.foodName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || food.food.foodCategory === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const categories = [
    ,
    ...new Set(foods.map((food) => food.food.foodCategory)),
  ];

  return (
    <>
      <div className="findFooodPage">
        {/* Add your header component */}
        <Header />

        <div className="foodBody">
          <Form.Control
            type="text"
            placeholder="Search by food name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />

          <div className="filter-dropdown">
            <DropdownButton
              id="dropdown-basic-button"
              title="Filter by Category"
            >
              <Dropdown.Item onClick={() => setSelectedCategory("")}>
                All Categories
              </Dropdown.Item>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>

          <div className="food">
            <div className="card_wrapper">
              {filteredFoods.map((item) => (
                <Card
                  key={item.food._id}
                  style={{ width: "20rem", height: "110vh" }}
                >
                  <div className="img-wrapper">
                    <Card.Img
                      variant="top"
                      src={`https://foodheavenserver.onrender.com/${item.food.foodPicture}`}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{item.sellerName}'s kitchen</Card.Title>
                    <Card.Title>{item.food.foodName}</Card.Title>
                    <Card.Text>{item.food.foodDescription}</Card.Text>
                    <Card.Text>Price: {item.food.foodPrice} Taka</Card.Text>
                    {/* Display expected delivery date-time */}
                    <Card.Text>
                      Expected Delivery Time:{" "}
                      {item.food.expectedDeliveryDateTime}
                    </Card.Text>
                    {/* Display last order date-time */}
                    <Card.Text>
                      Last Time for Order : {item.food.lastOrderDateTime}
                    </Card.Text>
                    <Button variant="primary" onClick={() => addToCart(item)}>
                      Add to cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Add your footer component */}
      <Footer />
    </>
  );
}

export default FindFood;
