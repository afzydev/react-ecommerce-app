import React, { Component } from "react";
import Product from "./Product";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Products extends Component {

  getProductData = () => {
    const productsData = this.props.productsList
      .map(product => {
        return (
          <Product
            key={product.item_id}
            price={product.price}
            name={product.name}
            description={product.description}
            picture_url={product.picture_url}
            id={product.item_id}
            addToCart={this.props.addToCart}
            productQuantity={this.props.productQuantity}
            updateQuantity={this.props.updateQuantity}
          />
        );
    });
    if (productsData.length <= 0) {
      return <NoResults />;
    } else {
      return productsData;
    }
  }

  render() {
    return (
      <div className="products-wrapper">
              <CSSTransitionGroup
              transitionName="fadeIn"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              component="div"
              className="products"
            >
              {this.getProductData()}
            </CSSTransitionGroup>
      </div>
    )
  }
}

export default Products;
