import React, { Component } from 'react';
import { createStore, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from 'Redux/index/store';
import ACTIONS from 'Redux/index/actions';

class Counter extends Component {
  constructor (props) {
    super(props);
    // 获取初始状态
    this.state = {
      value: store.getState().value
    };
  }
  componentWillMount () {
    // 监听 store 变化
    store.subscribe(this.watchStore.bind(this));
  }
  // componentWillUnmount () {
  // 对 store 变化取消监听
  // store.unsubscribe(this.watchStore.bind(this));
  // }
  // 监听回调函数，当 store 变化后执行
  watchStore () {
    // 回调函数中重新设置状态
    this.setState(this.getCurrentState());
  }
  // 从 store 中获取状态
  getCurrentState () {
    return {
      value: store.getState().value
    };
  }
  // 增加函数
  increase () {
    // 派发 INCREMENT Action
    store.dispatch(ACTIONS.increament());
  }
  // 减少函数
  decrease () {
    // 派发 DECREAMENT Action
    store.dispatch(ACTIONS.decreament());
  }
  render () {
    return (
      <div className="counter">
        <div>
          <button onClick = { this.increase.bind(this) }>+</button>
          <button onClick = { this.decrease.bind(this) }>-</button>
        </div>
        <span>当前的值为:{ this.state.value }</span>
      </div>
    );
  }
}
// export default  connect(mapStateToProps,mapDispatchToProps)(List);
Counter.propTypes = {
  value: PropTypes.number
};
export default Counter;
