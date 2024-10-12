import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  // Toggle menu opening and closing
  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  return (
    <section className="h-wrapper">
      {/* Logo */}
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img
            src="./sand-sea-logo.png.png"
            alt="sand-sea-realty-logo"
            width={180}
            height={120}
          />
        </Link>

        {/* Menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className={`flexCenter h-menu ${menuOpened ? "open" : ""}`}>
            <NavLink to="/properties">Properties</NavLink>
            <button className="button">
              <a href="mailto:marketingsandnsea@gmail.com">Contact</a>
            </button>
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={toggleMenu}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
