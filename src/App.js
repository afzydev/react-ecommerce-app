import React, { Component } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import "./scss/style.scss";
import items from './data/items.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      category: "",
      cartBounce: false,
      quantity: 1
    };
  }

  getProducts = () => {
    this.setState({products: items});
  }
  componentWillMount() {
    this.getProducts();
  }

  // Add to Cart
  handleAddToCart = (selectedProducts) => {
    const cartItem = this.state.cart;
    const productID = selectedProducts.id;
    const productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      const index = cartItem.findIndex(x => x.id === productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      () => {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
      },
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  handleRemoveProduct = (id, e) => {
    let cart = this.state.cart;
    const index = cart.findIndex(x => x.id === id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }

  checkProduct = (productID) => {
    const cart = this.state.cart;
    return cart.some((item) => item.id === productID);
  }

  sumTotalItems = () => {
    this.setState({
      totalItems: this.state.cart.length
    });
  }

  sumTotalAmount = () => {
    let total = 0;
    const cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  //Reset Quantity
  updateQuantity = (qty) => {
    this.setState({
      quantity: qty
    });
  }

  render() {
    return (
        <div className="container">
          <Header
            cartBounce={this.state.cartBounce}
            total={this.state.totalAmount}
            totalItems={this.state.totalItems}
            cartItems={this.state.cart}
            removeProduct={this.handleRemoveProduct}
            categoryTerm={this.state.category}
            updateQuantity={this.updateQuantity}
            productQuantity={this.state.moq}
          />
          <Products
            productsList={this.state.products}
            addToCart={this.handleAddToCart}
            productQuantity={this.state.quantity}
            updateQuantity={this.updateQuantity}
          />
          <Footer />
      </div>
    )
  }
}

export default App;
