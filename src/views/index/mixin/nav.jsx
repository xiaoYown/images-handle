import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { getCookie, signOut } from 'tools/client';

class nav extends Component {
  signOut () {
    signOut();
    window.location.href = '/';
  }
  render () {
    return (
      <nav className="nav-index">
        images handle
      </nav>
    );
  }
};

export default nav;

// <IndexLink className="nav-item" activeClassName="active" to="/">home</IndexLink>
// <Link className="nav-item" activeClassName="active" to="/redux">user</Link>
