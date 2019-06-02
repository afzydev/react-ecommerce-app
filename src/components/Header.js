import React, { Component } from "react";
import Cart from "./Cart";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="brand">
            My Organic Green Store
          </div>
          <div className="middleContent">
          </div>
          <Cart {...this.props} />
        </div>
      </header>
    );
  }
}

export default Header;
