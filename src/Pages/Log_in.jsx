import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Log_in.css";
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
import React, { useState, useEffect } from "react";
import { AuthContext } from "../App.jsx";
import { useContext } from "react";
import { toast } from "react-toastify";
import Image from "react-bootstrap/Image";

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
                <FaInstagram /> Instagram
              </a>
              <br />
              <a href="https://www.twitter.com">
                <FaTwitter /> Twitter
              </a>
              <br />
              <a href="https://www.facebook.com">
                <FaFacebook /> Facebook
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

function Log_in() {
  const navigate = useNavigate();
  const { setUserType } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    axios
      .post("https://foodheavenserver.onrender.com/logIn", data)
      .then((result) => {
        if (result.data && result.data.success) {
          localStorage.setItem("type", result.data.type);
          setUserType(result.data.type);

          // Check if the user type is Seller and store seller's ID
          if (result.data.type === "Seller") {
            localStorage.setItem("email", email); // Store seller's ID
            navigate("/SellerDashboard");
          } else if (result.data.type === "Customer") {
            localStorage.setItem("email", email);
            navigate("/Find_food");
          } else {
            localStorage.setItem("email", email);
            navigate("/RiderDashboard");
          }
        } else {
          alert("Invalid credentials!");
        }
      })
      .catch((err) => {
        alert("Error occurred: " + err.message);
      });
  };

  return (
    <>
      <Header />
      <main className="login-background">
        <Container className="d-flex justify-content-center align-items-center vh-70 ">
          <Card style={{ width: "25rem", height: "80vh" }}>
            <Card.Body>
              <Card.Title className="text-center">LOG IN</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <Button variant="primary" type="submit" block={true}>
                  Submit
                </Button>
                <Button
                  variant="link"
                  onClick={() => navigate("/Forget_password")}
                  className="text-center d-block mt-2"
                >
                  Forgot Password?
                </Button>
              </Form>
              <Button
                variant="secondary"
                onClick={() => navigate("/Sign_up")}
                block
                className="mt-3"
              >
                If you are not registered signup now
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Log_in;
