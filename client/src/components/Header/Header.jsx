import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
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
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:anmolsrivastava678@gmail.com">Contact</a>

            {/* add property
            <div onClick={handleAddPropertyCLick}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} /> */}

            {/* Login Button */}
            {/* {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login/SignUp
              </button>
            ) : (
              <MantineProvider>
                <ProfileMenu user={user} logout={logout} />
              </MantineProvider>
            )} */}
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
