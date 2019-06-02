import React from "react";
import * as siteIcons from '../images'
const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <img
        src={siteIcons['emptyCart']}
        alt="empty-cart"
      />
      <h2>You cart is empty!</h2>
    </div>
  );
};

export default EmptyCart;
