import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { render } from 'react-dom';

import AppCmpt from '../App.jsx';
import homeCmpt from './views/home.jsx';

import { getCookie } from 'tools/client';
import jQuery from 'jquery';
import config from 'config/config';

require('sass/base.scss');
require('sass/index.scss');

// global.jQuery = global.$ = jQuery;
const historyModel = config.end === 'cs' ? hashHistory : browserHistory;

class Index extends React.Component {
  // constructor (props) {
  //   super(props);
  // }

  // render之前调用，业务逻辑都应该放在这里，如对state的操作等
  componentWillMount () {
  }
  // 渲染并返回一个虚拟DOM
  render () {
    return (
      <div className="rename-wrap">
        {this.props.children}
      </div>
    );
  }
};

// 权限判断
// nextState, replace
const requireAuth = () => {
  // if (config.end !== 'cs' && !getCookie('session')) {
  //   replace({ pathname: '/login' });
  // }
};

const routers = (
  <AppCmpt>
    <Router history={ historyModel }>
      <Route path="/" component={ Index }>
        <IndexRoute component={ homeCmpt } onEnter={ requireAuth }/>
      </Route>
    </Router>
  </AppCmpt>
);

render(
  routers,
  document.getElementById('page_rename')
);
