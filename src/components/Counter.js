import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.productQuantity };
  }

  increment = (e) => {
    this.setState(
      prevState => ({
        value: Number(prevState.value) + 1
      }),
      () => {
        this.props.updateQuantity(this.state.value);
      }
    );
    e.preventDefault();
  }

  decrement = (e) => {
    e.preventDefault();
    if (this.state.value <= 1) {
      return this.state.value;
    } else {
      this.setState(
        prevState => ({
          value: Number(prevState.value) - 1
        }),
        () => {
          this.props.updateQuantity(this.state.value);
        }
      );
    }
  }

  feed = (e) => {
    this.setState(
      {
        value: this.refs.feedQty.value
      },
      function() {
        this.props.updateQuantity(this.state.value);
      }
    );
  }

  resetQuantity = () => {
    this.setState({
      value: 1
    });
  }

  render() {
    return (
      <div className="stepper-input">
        <a href="/" className="decrement" onClick={(e) => this.decrement(e)}>
          –
        </a>
        <input
          ref="feedQty"
          type="number"
          className="quantity"
          value={this.state.value}
          onChange={(e) => this.feed(e)}
        />
        <a href="/" className="increment" onClick={(e) => this.increment(e)}>
          +
        </a>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;
