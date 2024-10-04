import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
// import { useMutation } from "react-query";
// import { createUser } from "../../utils/api";
import axios from "axios";

const Layout = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  useEffect(() => {
    const registerUser = async () => {
      if (isAuthenticated) {
        try {
          // Assuming user object contains the necessary fields (email, name, etc.)
          const userData = {
            email: user.email,
            // You may want to add additional fields if necessary
          };

          // Call the API to create the user if they do not exist
          const response = await axios.post(
            "http://localhost:8000/api/user/register",
            userData
          );
          console.log(response.data); // Log the response for debugging
          setUserDetails(userData); // Optionally set user details in context
        } catch (error) {
          console.error(
            "Error during user registration:",
            error.response ? error.response.data : error.message
          );
        }
      }
    };

    registerUser();
  }, [isAuthenticated, user, setUserDetails]);
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
