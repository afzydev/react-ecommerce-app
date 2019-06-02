import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import { findDOMNode } from "react-dom";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import * as siteIcons from '../images'
import { FaDollarSign } from 'react-icons/fa';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems
    };
  }

  handleClickOutside = (event) => {
    const cartNode = findDOMNode(this.refs.cartPreview);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleCart = (e) => {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }

  getCartInfo = () => {
    if (this.state.cart.length <= 0) {
      return <EmptyCart />;
    }
    return this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" alt="product" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price"><FaDollarSign style={{height:'14px'}} /> {product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount"><FaDollarSign style={{height:'14px'}} /> {product.quantity * product.price}</p>
          </div>
          <a
            className="product-remove"
            href="/"
            onClick={this.props.removeProduct.bind(this, product.id)}
          >
            ×
          </a>
        </li>
      );
    });
  }

  render() {
    const { total, totalItems, cartBounce } = this.props;
    const { showCart, cart } = this.state;
    return (
          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="/"
              onClick={(e) => this.handleCart(e)}
              ref="cartButton"
            >
              <img
                className={cartBounce ? "tada" : " "}
                src={siteIcons['bag']}
                alt="Cart"
              />
              {totalItems ? (
                <span className="cart-count">{totalItems}</span>
              ) : (
                ""
              )}
            </a>
            <div
              className={
                showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>
                <CSSTransitionGroup
                  transitionName="fadeIn"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}
                  component="ul"
                  className="cart-items"
                >
                  {this.getCartInfo()}
                </CSSTransitionGroup>
              </CartScrollBar>
              <div className="action-block">
                <button
                  type="button"
                  className={cart.length > 0 ? " " : "disabled"}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
        </div>
    );
  }
}

export default Cart;
