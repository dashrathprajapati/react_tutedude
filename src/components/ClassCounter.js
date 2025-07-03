import React, { Component } from "react";

class ClassCounter extends Component {
  state = { count: 0 };
  increament = () => this.setState({ count: this.state.count + 1 });
  decrement = () => {
    if (this.state.count > 0) this.setState({ count: this.state.count - 1 });
  };
  render() {
    return (
      <div className="counter-box">
        <h2>Class Component</h2>
        <p className="count">{this.state.count}</p>
        <button onClick={this.increament}>++</button>
        <button onClick={this.decrement}>--</button>
      </div>
    );
  }
}

export default ClassCounter;
