import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

import Header from '../../components/Header';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="jumbotron">
            <h2>Dashboard</h2>
            <p>This example is a quick exercise to illustrate how the default, static navbar and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
          </div>
        </div>
        </div>
    );
  }
}

export default Dashboard;
