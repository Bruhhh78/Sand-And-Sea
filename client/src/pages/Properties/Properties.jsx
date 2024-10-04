import React from "react";
import "./Properties.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  console.log(data);

  if (isError) {
    return (
      <div className="flexColCenter" style={{ height: "60vh" }}>
        <span>Error while fetching data. Please try again later.</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flexColCenter" style={{ height: "60vh" }}>
        <PuffLoader
          size={80}
          color="#4066ff"
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  return (
    <div className="flexColCenter paddings properties-container">
      <SearchBar />
      <div className="paddings flexCenter properties">
        {data && data.length > 0 ? (
          data.map((card, i) => <PropertyCard card={card} key={i} />)
        ) : (
          <span>No properties available</span>
        )}
      </div>
    </div>
  );
};

export default Properties;
