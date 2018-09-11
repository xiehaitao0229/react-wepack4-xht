import React, { Component } from 'react';
import { increment, decrement, reset } from 'actions/couters';

import { connect } from 'react-redux';

class Counter extends Component {
  render() {
    const {
      counter: { count },
    } = this.props;
    return (
      <div>
        <div>当前计数为:{count}</div>
        <button onClick={() => this.props.increment()}>自增</button>
        <button onClick={() => this.props.decrement()}>自减</button>
        <button onClick={() => this.props.reset()}>重置</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.couter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(increment());
    },
    decrement: () => {
      dispatch(decrement());
    },
    reset: () => {
      dispatch(reset());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
