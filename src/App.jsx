import * as ReactBootstrap from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import "bootstrap";
import "./App.css";
import Home from "./Pages/Home";
import FindFoodCopy from "./Pages/Find_food_copy";
import Log_in from "./Pages/Log_in";
import Customer_profile from "./Pages/Customer_profile";
import Delivery_address from "./Pages/Delivery_address";
import FindFood from "./Pages/Find_food";
import Forget_password from "./Pages/Forget_password";
import No_page from "./Pages/No_page";
import Profile_info_update from "./Pages/Profile_info_update";
import Register from "./Pages/Register";
import RiderDashboard from "./Pages/RiderDashboard";
import FoodUploadPage from "./Pages/Seller_Upload_Menu";
import Sign_up from "./Pages/Sign_up";
import Cart from "./Pages/Cart";
import SellerDashboard from "./Pages/SellerDashboard";
import ViewConfirmedOrders from "./Pages/ViewConfirmedOrders";
import OrderHistory from "./Pages/CustomerOrderHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
// ... other imports

export const AuthContext = createContext({
  userType: null,
  setUserType: () => {},
});

function NavigationHandler() {
  const navigate = useNavigate();
  const { userType } = useContext(AuthContext);

  useEffect(() => {
    if (userType === "Seller") {
      navigate("/SellerDashboard");
    } else if (userType === "Customer") {
      navigate("/Find_food");
    } else if (userType === "Rider") {
      navigate("/RiderDashboard");
    }
  }, [userType, navigate]);

  return null;
}

function App() {
  const [userType, setUserType] = useState(localStorage.getItem("type"));

  return (
    <AuthContext.Provider value={{ userType, setUserType }}>
      <BrowserRouter>
        <Routes>
          {/* Include the NavigationHandler in the Routes */}
          <Route path="/" element={<NavigationHandler />} />
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Log_in" element={<Log_in />} />
          <Route path="/Sign_up" element={<Sign_up />} />
          <Route path="/Forget_password" element={<Forget_password />} />
          <Route path="*" element={<No_page />} />
          <Route path="/Find_food_copy" element={<FindFoodCopy />} />
          <Route
            path="/Profile_info_update"
            element={<Profile_info_update />}
          />

          {/* Conditional Routes */}
          {userType && (
            <>
              {/* Customer Routes */}
              {userType === "Customer" && (
                <>
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/Find_food" element={<FindFood />} />
                  <Route
                    path="/CustomerOrderHistory"
                    element={<OrderHistory />}
                  />
                  {/* ... other customer routes */}
                </>
              )}

              {/* Seller Routes */}
              {userType === "Seller" && (
                <>
                  <Route
                    path="/SellerDashboard"
                    element={<SellerDashboard />}
                  />
                  <Route
                    path="/Seller_Upload_Menu"
                    element={<FoodUploadPage />}
                  />
                  <Route
                    path="/ViewConfirmedOrders"
                    element={<ViewConfirmedOrders />}
                  />
                  {/* ... other seller routes */}
                </>
              )}

              {/* Rider Routes */}
              {userType === "Rider" && (
                <>
                  <Route path="/RiderDashboard" element={<RiderDashboard />} />
                  {/* ... other rider routes */}
                </>
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
