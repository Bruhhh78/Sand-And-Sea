import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { createUser } from "../../utils/api";
// import useFavourites from "../../hooks/useFavourites";
// import useBookings from "../../hooks/useBookings";

const Layout = () => {

  // useFavourites();
  // useBookings();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const token = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "https://dev-bruhhh.us.auth0.com/api/v2/",
            scope: "openid profile email",
          },
        });

        // Store the access token in localStorage
        localStorage.setItem("access_token", token);

        // Update user details with the token
        setUserDetails((prev) => ({ ...prev, token }));

        // Register user using the token
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
