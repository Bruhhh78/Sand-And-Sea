import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";

const Layout = () => {
  useFavourites();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  // Get access token and register user if authenticated
  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const token = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "https://dev-bruhhh.us.auth0.com/api/v2/",
            scope: "openid profile email", // Email scope included
          },
        });

        // Store token and update context
        localStorage.setItem("access_token", token);
        setUserDetails((prev) => ({ ...prev, token }));

        // Register user with token if email is available
        if (user?.email) {
          await createUser(user.email, token);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user?.email, getAccessTokenWithPopup, setUserDetails]);

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
