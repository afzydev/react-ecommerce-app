import React, { Component } from "react";
import Counter from "./Counter";
import { FaDollarSign } from 'react-icons/fa';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      isAdded: false
    };
  }
  addToCart = (image, name, price, id, quantity) => {
    this.setState(
      {
        selectedProduct: {
          image: image,
          name: name,
          price: price,
          id: id,
          quantity: quantity
        }
      },
      () => {
        this.props.addToCart(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAdded: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }

  render() {
    const { name, description, picture_url, price: { base_unit }, id, productQuantity: quantity } = this.props
    return (
      <div className="product">
        <div className="product-image">
          <img
            src={picture_url}
            alt={name}
          />
        </div>
        <h4 className="product-name">{name}</h4>
        <p className="product-price"><FaDollarSign style={{height:'14px'}} /> {base_unit}</p>
        <p className="product-desc">{description}</p>
        <Counter
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
        />
        <div className="product-action">
          <button
            className={!this.state.isAdded ? "" : "added"}
            type="button"
            onClick={(e) => this.addToCart(
              picture_url,
              name,
              base_unit,
              id,
              quantity
            )}
          >
            {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
