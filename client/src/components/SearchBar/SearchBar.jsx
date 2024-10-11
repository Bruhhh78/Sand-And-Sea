import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const SearchBar = ({ filter, setFilter,disabled  }) => {
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
      placeholder="Search by title/city/country..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        disabled={disabled}
      />
      <button className="button" disabled={disabled}>Search</button>
    </div>
  );
};

export default SearchBar;
