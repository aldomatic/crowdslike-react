import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Link, Redirect } from 'react-router-dom';

@inject('UserStore')
@observer
export default class Layout extends Component {
  state = {
      redirectToReferrer: false
  }
  constructor(props){
    super(props);
 }

  static fetchData() {} // will be used for server side rendering

  static propTypes = {
    children: React.PropTypes.object,
  }

  logoutAction(event){
    event.preventDefault();
    this.props.UserStore.apiAuth.signout(() =>{
      console.log(`Logging out.`);
      this.setState({redirectToReferrer: true})
    })
  }

  render() {
    const { redirectToReferrer } = this.state;

    if(redirectToReferrer){
      return (
          <Redirect to="/" />
      )
    }
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="#">CrowdsLike</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li> <a href="#" className="nav-link" onClick={(event)=>this.logoutAction(event)}>Log Out</a></li>
        </ul>
      </div>
    </nav>

      <div className="container">
        <div>
          {this.props.children} 
        </div>
      </div>
      </div>
    );
  }
}