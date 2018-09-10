import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    let { count } = this.state;
    this.setState({
      count: ++count,
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        this is home~123
        <br />
        当前计数：
        {count}
        <br />
        <button onClick={() => this.handleClick()}>自增</button>
      </div>
    );
  }
}
