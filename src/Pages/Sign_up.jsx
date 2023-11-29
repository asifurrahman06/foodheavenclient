import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import "./Sign_up.css";
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

function DropdownHeader({ selectedArea, onClick }) {
  return (
    <Dropdown.Toggle variant="primary" id="area-dropdown">
      {selectedArea ? selectedArea : "Select Area"}
    </Dropdown.Toggle>
  );
}

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
      <Navbar.Brand onClick={() => navigate("/")} className="foodHaven">
        FoodHeaven
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link onClick={() => navigate("/Log_in")}>Login</Nav.Link>
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

function Sign_up() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedType, setSelectedType] = useState("Customer"); // Default selection
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState(""); // State variable for selected area

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      address,
      phone,
      type: selectedType,
      area: selectedArea,
    };
    axios
      .post("https://foodheavenserver.onrender.com/signUp", data)
      .then(() => {
        navigate("/Log_in");
      })
      .catch((err) => {
        // Handle errors here
        setError(
          err.response ? err.response.data.message : "Unknown error occurred"
        );
      });
  };

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="signup-background">
        <Container className="d-flex justify-content-center align-items-center vh-200">
          <Card style={{ width: "40rem", height: "120vh" }}>
            <Card.Body>
              <h3 className="card-title text-center">Sign Up</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={name}
                    placeholder="Your Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Your Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Your Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={phone}
                    placeholder="Phone Number"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    value={address}
                    placeholder="Your Address in Detail"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Dropdown>
                    <DropdownHeader selectedArea={selectedArea} />
                    <Dropdown.Menu className="dropdown-menu-scrollable">
                      <Dropdown.Item onClick={() => setSelectedArea("Mirpur ")}>
                        Mirpur
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Dhaka Cantonment")}
                      >
                        Dhaka Cantonment
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Mirpur Cantonment")}
                      >
                        Mirpur Cantonment
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedArea("Gulshan")}>
                        Gulshan
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedArea("Banani")}>
                        Banani
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Bashundhara")}
                      >
                        Bashundhara
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Purbachal")}
                      >
                        Purbachal
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedArea("Uttara")}>
                        Uttara
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedArea("Badda")}>
                        Badda
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Moghbazar")}
                      >
                        Moghbazar
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Old Dhaka")}
                      >
                        Old Dhaka
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedArea("Shahbag")}>
                        Shahbag
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Gulisthan")}
                      >
                        Gulisthan
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Dhanmondi")}
                      >
                        Dhanmondi
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Mohammadpur")}
                      >
                        Mohammadpur
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedArea("Gabtali")}>
                        Gabtali
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedArea("Bosila")}>
                        Bosila
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Kawranbazar")}
                      >
                        Kawranbazar
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Farmgate")}
                      >
                        Farmgate
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedArea("Motijhil")}
                      >
                        Motijhil
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="type-dropdown">
                      {selectedType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setSelectedType("Seller")}>
                        Seller
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelectedType("Customer")}
                      >
                        Customer
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedType("Rider")}>
                        Rider
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
              {error && <p className="text-danger mt-2">{error}</p>}
              <p className="mt-3 text-center">
                Already have an account? <Link to="/Log_in">Log In</Link>
              </p>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Sign_up;
