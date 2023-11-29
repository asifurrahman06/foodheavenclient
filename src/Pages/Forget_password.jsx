import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import "./Forget_password.css";
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

function Forget_password() {
  const navigate = useNavigate();

  function go_to_log_in() {
    navigate("/Log_in");
  }
  function go_to_log_in_next() {
    toast.success("Password sent to your email. Please enter and login");
    navigate("/Log_in");
  }

  const [email, setEmail] = useState("");
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://foodheavenserver.onrender.com/send-email", { email });
      toast.success("Password sent to your email");
      navigate("/Log_in");
      console.log("Navigated successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="forgetpassword-background">
        <Container className="d-flex justify-content-center align-items-center vh-50">
          <Card style={{ width: "28rem", height: "50vh" }}>
            <Card.Body>
              <h3 className="card-title text-center">Forget Password</h3>
              <Form onSubmit={sendEmail}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Your Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={go_to_log_in_next}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
              <p className="mt-3 text-center">
                Remembered your password?{" "}
                <Button variant="link" onClick={go_to_log_in}>
                  Log In
                </Button>
              </p>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Forget_password;
