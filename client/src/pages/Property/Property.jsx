import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { FaShower } from "react-icons/fa";
import { MdLocationCity, MdMeetingRoom } from "react-icons/md";
import { AiTwotoneCar } from "react-icons/ai";
import "./Property.css";
import Map from "../../components/Map/Map";
import DownloadPDF from "../../utils/DownloadPDF";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["residency", id], () =>
    getProperty(id)
  );
  const navigate = useNavigate();

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
        {/* image */}
        <img src={data?.image} alt="home.img" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* Head Part */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ₹ {data?.price}.55 Cr Onwards
              </span>
            </div>

            {/* facilities And Basic Details */}
            <div className="flexStart facilities">
              {/* Bedrooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{facilities[0].bedrooms || 0} Bedrooms</span>
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
                {data.address} {data?.city} {data?.country}
              </span>
            </div>
            {/* Booking Button */}
            <button
              onClick={() => navigate("/sendMessage", { replace: true })}
              className="button bookingButton"
            >
              Book Your Visit
            </button>
            <h3>Click to Download Brochure</h3>
            {/* Download Brochure */}
            <DownloadPDF />
          </div>

          {/* right */}
          <div className="map">
            <Map
              address={data?.address}
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
