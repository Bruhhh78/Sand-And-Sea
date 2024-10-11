import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {

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
