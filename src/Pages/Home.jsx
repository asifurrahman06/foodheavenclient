import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
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
        {isLoggedIn && <Nav.Link onClick={() => navigate("/Profile_info_update")} >Profile</Nav.Link>}
          {!isLoggedIn && (
            <Nav.Link onClick={() => navigate("/Log_in")}>Login</Nav.Link>
          )}
          {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          
          {!isLoggedIn && (
            <Nav.Link onClick={() => navigate("/Sign_up")}>Signup</Nav.Link>
          )}
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

function Home() {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("type");

  function go_to_Find_food() {
    if (!isLoggedIn) {
      navigate("/Find_food_copy");
    } else {
      navigate("/Find_food");
    }
  }

  return (
    <>
      <Header />
      <Container fluid className="all">
        <Row className="justify-content-center align-items-center hero-section">
          <Col md={6} className="text-center">
            <h1 className="display-4">Welcome to FoodHeaven</h1>
            <p className="lead">
              Experience the best homemade food at your doorstep.
            </p>
            {!isLoggedIn && (
              <Button
                className="btn-lg"
                variant="primary"
                onClick={go_to_Find_food}
              >
                Order Now
              </Button>
            )}
          </Col>
        </Row>

        <Row className=" features-section">
          <Col md={4} className="p-2">
            <Card className="feature-card ">
              <Card.Img variant="top" src="./Image/best (1).jpg" />
              <Card.Body>
                <Card.Title>Only the Best</Card.Title>
                <Card.Text>
                  Homemade food that's handpicked for quality and taste.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="p-2">
            <Card className="feature-card">
              <Card.Img variant="top" src="./Image/Deivery_man.webp" />
              <Card.Body>
                <Card.Title>Track in Real-time</Card.Title>
                <Card.Text>
                  Watch your food journey with our live tracking system.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="p-2">
            <Card className="feature-card">
              <Card.Img variant="top" src="./Image/best.jpg" />
              <Card.Body>
                <Card.Title>Safe & Secure</Card.Title>
                <Card.Text>
                  Only cash on delivery. So no risk of payment
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {!isLoggedIn && (
          <Row className="justify-content-center mt-5 mb-5">
            <Col md={8} className="text-center career-section">
              <p>
                Passionate about food or delivery?{" "}
                <a href="./Sign_up">
                  <div className="go">Join our team </div>
                </a>{" "}
                and turn your passion into a profession.
              </p>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Home;
