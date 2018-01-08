// import React, { Component } from 'react';
import React from 'react';

class Aside extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'Aside',
      activeEl: null
    };
    this.collapse = this.collapse.bind(this);
  }
  // 属性校验
  static propTypes = {
    list: React.PropTypes.array.isRequired
  }
  collapse (type) {
    if (type === this.state.activeEl) {
      const isActive = /hide/.test(this.refs[this.state.activeEl].className);
      this.refs[this.state.activeEl].className = isActive ? 'aside-info' : 'aside-info hide';
      return;
    }
    if (this.state.activeEl) {
      this.refs[this.state.activeEl].className += ' hide';
    }
    this.state.activeEl = type;
    this.refs[type].className = 'aside-info';
  }
  render () {
    const list = this.props.list.map((item, index) =>
      <li key={ index } className="aside-item">
        <span onClick={ () => this.collapse(item.type) }>select-{ item.name }</span>
        <div className="aside-info hide" ref={ item.type }>show</div>
      </li>
    );
    return (
      <div className="aside-wrap">
        <ul className="aside-container">
          { list }
        </ul>
      </div>
    );
  }
};
Aside.defaultProps = {
  title: 'aside-list'
};

export default Aside;
