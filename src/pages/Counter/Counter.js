import React, { Component } from 'react';
import { increment as _increment, decrement as _decrement, reset as _reset } from 'actions/couters';

import { connect } from 'react-redux';

class Counter extends Component {
  render() {
    const {
      counter: { count },
      increment,
      decrement,
      reset,
    } = this.props;
    console.log(this.props);
    return (
      <div>
        <div>
          当前计数为:
          {count}
        </div>
        <button onClick={() => increment()}>自增</button>
        <button onClick={() => decrement()}>自减</button>
        <button onClick={() => reset()}>重置</button>
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
      dispatch(_increment());
    },
    decrement: () => {
      dispatch(_decrement());
    },
    reset: () => {
      dispatch(_reset());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
