import React from "react";
import './DownloadPDF.css'; // Import the CSS file

const DownloadPDF = () => {
  return (
    <div className="d-flex flex-column flex-sm-row align-items-center mt-5 justify-content-center">
      <a
        className="btn btn-custom"
        href="/Airica Opp Brochure.pdf"
        download="Airica Opp Brochure.pdf"
      >
        Airica Adani
      </a>
      <a
        className="btn btn-custom"
        href="/Lodha Altus Brochure.pdf"
        download="Lodha Altus Brochure.pdf"
      >
      Lodha Altus
      </a>
    </div>
  );
};

export default DownloadPDF;
