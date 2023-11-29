import React, { useState, useEffect } from "react";
import "./Register.css"; // Make sure to import your CSS file

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    script.onload = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("address"),
        { types: ["geocode"] }
      );
      autocomplete.addListener("place_changed", () => {
        const selectedPlace = autocomplete.getPlace();
        setAddress(selectedPlace.formatted_address);
      });
    };
    document.body.appendChild(script);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Registration Data:", { name, email, password, phone, address });
  };

  return (
    <div className="container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <div id="map" style={{ height: "200px", width: "100%" }}></div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
