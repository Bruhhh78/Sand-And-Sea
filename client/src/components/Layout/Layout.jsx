import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import axios from "axios";

const Layout = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  // Moved the effect into a single useEffect to avoid nesting
  useEffect(() => {
    const registerUser = async (token) => {
      if (!user || !user.email) {
        console.error("User email is missing!");
        return;
      }

      const userData = { email: user.email };
      console.log("Registering user with data:", userData);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/register",
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Registration response:", response.data);
        setUserDetails({ ...userData, token });
      } catch (error) {
        handleRegistrationError(error);
      }
    };

    const handleRegistrationError = (error) => {
      if (error.response) {
        console.error("Registration failed with status:", error.response.status);
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Registration error:", error.message);
      }
    };

    const getTokenAndRegister = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "https://dev-bruhhh.us.auth0.com/api/v2/",
          scope: "openid profile email",
        });

        if (!token) {
          throw new Error("Failed to retrieve access token.");
        }

        console.log("Access Token:", token);
        localStorage.setItem("access_token", token);
        await registerUser(token);
      } catch (error) {
        console.error("Error getting access token:", error.message);
      }
    };

    if (isAuthenticated && user) {
      console.log("User is authenticated:", user);
      const storedToken = localStorage.getItem("access_token");
      if (!storedToken) {
        getTokenAndRegister();
      } else {
        console.log("Stored Access Token:", storedToken);
        registerUser(storedToken);
      }
    } else {
      console.log("User is not authenticated or user data is missing");
    }
  }, [isAuthenticated, user, setUserDetails, getAccessTokenSilently]); // Ensure hooks are used correctly

  return (
    <>
      <div style={{ background: "#7f8e9f", overflow: "hidden" }}>
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
