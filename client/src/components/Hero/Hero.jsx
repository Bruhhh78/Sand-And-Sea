import React from "react";
import "./Hero.css";
import CountUp from "react-countup";
import { motion, spring } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* Left Side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: "0" }}
              animate={{ y: "0", opacity: "1" }}
              transition={{ duration: 4, type: "spring" }}
            >
              Discover <br />
              Most Suitable <br />
              Property
            </motion.h1>
          </div>

          {/* Description */}
          <div className="flexColStart hero-des">
            <span className="desText">
              Find a variety of properties that suits you very easily
            </span>
            <span className="desText">
              Forget all difficulties in finding a residence for you
            </span>
          </div>

          {/* SearchBar */}
          <SearchBar/>

          {/* Stats */}
          <div className="flexCenter stats">
            {/* First Stat */}
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText desText ">Premium Products</span>
            </div>

            {/* Second Stat */}
            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText desText">Happy Customers</span>
            </div>

            {/* Third Stat */}
            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} />
                <span>+</span>
              </span>
              <span className="secondaryText desText">Award Winning</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flexCenter hero-right">
          <motion.div
          initial={{x:"7rem",opacity:0}}
          animate={{x:0, opacity:1}}
          transition={{
            duration:4,
            type:"spring",
          }}
          className="image-container">
            <img src="./hero-image.png" alt="heroImg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
