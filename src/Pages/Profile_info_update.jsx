import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Card,
  Navbar,
  Nav,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import "./Profile_info_update.css";
import { toast } from "react-toastify";

function DropdownHeader({ selectedArea }) {
  return (
    <Dropdown.Toggle variant="primary" id="area-dropdown">
      {selectedArea ? selectedArea : "Select Area"}
    </Dropdown.Toggle>
  );
}

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
          {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          {isLoggedIn === "Customer" && (
            <Nav.Link onClick={() => navigate("/Find_food")}>
              Order Food
            </Nav.Link>
          )}

          {!isLoggedIn && (
            <Nav.Link onClick={() => navigate("/Find_food_copy")}>
              Order Food
            </Nav.Link>
          )}
          {isLoggedIn === "Customer" && (
            <Nav.Link onClick={() => navigate("/CustomerOrderHistory")}>
              Ordered Food
            </Nav.Link>
          )}
          {isLoggedIn === "Customer" && (
            <Nav.Link onClick={() => navigate("/cart")}>
              <i className="fas fa-shopping-cart"></i> Cart
            </Nav.Link>
          )}

          {isLoggedIn === "Seller" && (
            <Nav.Link onClick={() => navigate("/SellerDashboard")}>
              Dashboard
            </Nav.Link>
          )}
          {isLoggedIn === "Seller" && (
            <Nav.Link onClick={() => navigate("/Seller_Upload_Menu")}>
              Upload Food
            </Nav.Link>
          )}
          {isLoggedIn === "Rider" && (
            <Nav.Link onClick={() => navigate("/RiderDashboard")}>
              Dashboard
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

function Profile_info_update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user information based on the email stored in localStorage
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        const response = await axios.get(
          `https://foodheavenserver.onrender.com/user/${storedEmail}`
        );
        const userData = response.data;

        // Set the user information in the state
        setName(userData.name || "");
        setEmail(userData.email || "");
        setAddress(userData.address || "");
        setPhone(userData.phone || "");
        setSelectedArea(userData.area || "");
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []); // Run this effect only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      address,
      phone,
      area: selectedArea,
    };

    try {
      await axios.put(`https://foodheavenserver.onrender.com/user/update/${email}`, data);
      console.log("User information updated successfully!");
      toast.success("Your Informations updated successfully");
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Unknown error occurred"
      );
    }
  };

  return (
    <>
      <Header />
      <div className="update-info-background">
        <Container className="d-flex justify-content-center align-items-center vh-200">
          <Card style={{ width: "40rem", height: "140vh" }}>
            <Card.Body>
              <h3 className="card-title text-center">Your Information</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <h2>Name</h2>
                  <Form.Control
                    type="text"
                    value={name}
                    placeholder="Your Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <h2>Email</h2>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Your Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <h2>Phone Number</h2>
                  <Form.Control
                    type="text"
                    value={phone}
                    placeholder="Phone Number"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <h2>Detail Address</h2>
                  <Form.Control
                    as="textarea"
                    value={address}
                    placeholder="Your Address in Detail"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <h2>Your Area</h2>

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

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </div>
              </Form>
              {error && <p className="text-danger mt-2">{error}</p>}
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Profile_info_update;
