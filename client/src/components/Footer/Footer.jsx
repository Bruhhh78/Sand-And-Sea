import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart">
          <img src="./sand-sea-logo.png.png" alt="logo" width={150} />

          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>
        
        {/* Right Side */}
        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span>Mumbai, Maharashtra</span>

          <div className="flexCenter f-menu">
            <NavLink to="/properties">Properties</NavLink>
            <NavLink to="https://www.linkedin.com/company/sand-sea-realty-venturellp/about/">About Us</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
