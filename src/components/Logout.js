import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  render() {
    return (
        <a href="#" className="nav-link" onClick={(event)=>this.logoutAction(event)}>Log Out</a>
    );
  }
}
export default Logout;
