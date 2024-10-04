import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdLocationCity, MdMeetingRoom } from "react-icons/md";
import { AiTwotoneCar } from "react-icons/ai";
import "./Property.css";
import Map from "../../components/Map/Map";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["residency", id], () =>
    getProperty(id)
  );

  // Debug the data structure
  console.log(data); // Inspect the API response

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  // Check if facilities exist
  const facilities = data?.facilities || {};

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like button */}
        <div className="like">
          <AiFillHeart size={24} color="white" />
        </div>

        {/* image */}
        <img src={data?.image} alt="home.img" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* Head Part */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ₹ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* Bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{facilities.bathrooms || 0} Bathrooms</span>
              </div>

              {/* Parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{facilities.parkings || 0} Parkings</span>
              </div>

              {/* Bedrooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{facilities.bedrooms || 0} Bedrooms</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationCity size={25} />
              <span className="secondaryText address">
                {data.address}{" "}
                {data?.city}{" "}
                {data?.country}
              </span>
            </div>

            {/* Booking Button */}
            <button className="button">Book Your Visit</button>
          </div>

          {/* right */}
          <div className="map">
            <Map
             address= {data?.address}
             city={data?.city}
             country={data?.country} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
