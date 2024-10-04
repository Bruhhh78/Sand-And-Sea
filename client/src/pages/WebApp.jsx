import React from 'react'
import Hero from "../components/Hero/Hero.jsx";
import "../App.css";
import Companies from "../components/Companies/Companies.jsx";
import Residencies from "../components/Residencies/Residencies.jsx";
import Values from "../components/Values/Values.jsx";
import Contact from "../components/Contact/Contact.jsx";
import GetStarted from "../components/GetStarted/GetStarted.jsx";


const WebApp = () => {
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
      <Hero />
    </div>
    <Companies />
    <Residencies />
    <Values />
    <Contact />
    <GetStarted />
  </div>
  )
}

export default WebApp