import React from "react";
import * as siteIcons from '../images'
const NoResults = () => {
  return (
    <div className="products">
      <div className="no-results">
        <img
          src={siteIcons['bareTree']}
          alt="Empty Tree"
        />
        <h2>Sorry, no products matched your search!</h2>
        <p>Enter a different keyword and try.</p>
      </div>
    </div>
  );
};

export default NoResults;
