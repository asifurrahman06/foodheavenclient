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
  Carousel,
} from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

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
          <Nav.Link onClick={() => navigate("/Log_in")}>Login</Nav.Link>
          <Nav.Link onClick={() => navigate("/Sign_up")}>Signup</Nav.Link>
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

function FindFoodCopy() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://foodheavenserver.onrender.com/foods").then((response) => {
      console.log(response.data);
      setFoods(response.data);
    });
  }, []);

  const addToCart = (food) => {
    toast.error("You must login first");
    navigate("/Log_in");
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearchTerm = food.foodName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || food.foodCategory === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });
  const categories = [
    "All",
    ...new Set(foods.map((food) => food.foodCategory)),
  ];

  return (
    <>
      <div className="findFooodPage">
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
              <Dropdown.Item onClick={() => setSelectedCategory("Breakfast")}>
                Breakfast
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedCategory("Lunch")}>
                Lunch
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedCategory("Dinner")}>
                Dinner
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedCategory("Snacks")}>
                Snacks
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <Button variant="danger" className="warningBtn" disabled>
            Please Login first, so that you can see the foods in your area.
            Otherwise some food may not be available to order in your area
          </Button>
          <div className="food">
            <div className="card_wrapper">
              {filteredFoods.map((food) => (
                <Card key={food._id}>
                  {/* Render food cards */}
                  <div className="img-wrapper">
                    <Card.Img
                      variant="top"
                      src={`https://foodheavenserver.onrender.com/${food.foodPicture}`}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{food.foodName}</Card.Title>
                    <Card.Text>{food.foodDescription}</Card.Text>
                    <Card.Text>Price: {food.foodPrice} Taka</Card.Text>
                    <Card.Text>
                      Last Time for Order: {food.lastOrderTime} hour
                    </Card.Text>
                    <Button variant="primary" onClick={() => addToCart(food)}>
                      Add to cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FindFoodCopy;
