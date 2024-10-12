import React from "react";
import "./Companies.css";

const Companies = () => {
  return (
<section className="c-wrapper">
<div className=" paddings innerWidth flexCenter c-container">
  <div className="carousel">
    <img src="./adani realty.png" alt="company-logo" />
    <img src="./Godrej Properties.png" alt="company-logo" />
    <img src="./hiranadani.jpeg.png" alt="company-logo" />
    <img src="./images.png" alt="company-logo" />
    <img src="./k raheja.png" alt="company-logo" />
    <img src="./Kalputraru logo.png" alt="company-logo" />
    <img src="./L & T realty.jpeg.png" alt="company-logo" />
    <img src="./prestige logo.jpeg.png" alt="company-logo" />
    {/* Duplicate images for infinite scrolling effect */}
    <img src="./adani realty.png" alt="company-logo" />
    <img src="./Godrej Properties.png" alt="company-logo" />
    <img src="./hiranadani.jpeg.png" alt="company-logo" />
    <img src="./images.png" alt="company-logo" />
    <img src="./k raheja.png" alt="company-logo" />
    <img src="./Kalputraru logo.png" alt="company-logo" />
    <img src="./L & T realty.jpeg.png" alt="company-logo" />
    <img src="./prestige logo.jpeg.png" alt="company-logo" />
  </div>
</div>
</section>
  );
};

export default Companies;

