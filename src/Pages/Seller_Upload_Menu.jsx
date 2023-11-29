import "./Seller_Upload_Menu.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function formatDateToDdMmYy(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(d.getFullYear()).slice(-2); // Get the last 2 digits of the year
  return `${day}-${month}-${year}`;
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
          {isLoggedIn && (
            <Nav.Link onClick={() => navigate("/Profile_info_update")}>
              Profile
            </Nav.Link>
          )}
          {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          {isLoggedIn && (
            <Nav.Link onClick={() => navigate("/SellerDashboard")}>
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
              <FaInstagram /> CSE-21, MIST
            </div>
            <div>
              <FaTwitter /> foodheaven@gmail.com
            </div>
          </Col>
          <Col sm={4} className="footer-social">
            <h5>Connect With Us</h5>
            <div>
              <a href="https://www.instagram.com">
                <FaInstagram />
                Instagram
              </a>
              <br />
              <a href="https://www.twitter.com">
                <FaTwitter />
                Twitter
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

function FoodUploadPage() {
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodPicture, setFoodPicture] = useState(null);
  const [foodCategory, setFoodCategory] = useState("Breakfast");
  const [expectedDeliveryDateTime, setExpectedDeliveryDateTime] = useState("");
  const [lastOrderDateTime, setLastOrderDateTime] = useState("");

  const email = localStorage.getItem("email");

  const handleFileChange = (event) => {
    setFoodPicture(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setFoodCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Seller ID is missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("foodPicture", foodPicture);
    formData.append("foodName", foodName);
    formData.append("foodDescription", foodDescription);
    formData.append("foodPrice", foodPrice);
    formData.append("foodCategory", foodCategory);
    formData.append("expectedDeliveryDateTime", expectedDeliveryDateTime); // Add expected delivery date-time
    formData.append("lastOrderDateTime", lastOrderDateTime); // Add last order date-time
    formData.append("email", email);

    try {
      await axios.post("https://foodheavenserver.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Menu Uploaded");
    } catch (error) {
      console.error("Error uploading food:", error);
      toast.error("You need to upload a photo and fill out other fields");
    }
  };

  return (
    <div className="sellerUplaodMenuPage">
      <Header />
      <div className="seller_login">
        <div className="food-upload-form">
          <h2>Upload Food</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Food Picture:</label>
              <input
                type="file"
                name="foodPicture"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div>
              <label>Food Name:</label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Food Description:</label>
              <textarea
                value={foodDescription}
                onChange={(e) => setFoodDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Food Price:</label>
              <input
                type="number"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Food Category:</label>
              <select value={foodCategory} onChange={handleCategoryChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
              </select>
            </div>
            <div>
              <label>Expected Delivery Date and Time:</label>
              <input
                type="datetime-local"
                value={expectedDeliveryDateTime}
                onChange={(e) => setExpectedDeliveryDateTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Last Time of Order (Date and Time):</label>
              <input
                type="datetime-local"
                value={lastOrderDateTime}
                onChange={(e) => setLastOrderDateTime(e.target.value)}
                required
              />
            </div>
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FoodUploadPage;
