import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Redirect } from 'react-router-dom';

import './Register.css';

@inject('UserStore')
@observer
class Register extends Component {
    state = {
        redirectToReferrer: false
    }
  constructor(props){
    super(props);
 }
 
  registerAction(event){
    event.preventDefault();
    this.props.UserStore.loginUser();
    this.setState({redirectToReferrer: true})
  }

  render() {
    const { credentials, fakeAuth } = this.props.UserStore;
    const { redirectToReferrer } = this.state

    if(redirectToReferrer){
        return (
            <Redirect to="/dashboard" />
        )
    }
    
    return (
      <div className="container">
        <div className="row">
            <div className='col-md-3'></div>
            <div className="col-md-6">
                <div className="login-box well">
                        <form action="">
                            <legend>Register</legend>
                            <div className="form-group">
                                <label htmlFor="username-email">Username</label>
                                <input value={credentials.email} onChange={(event) => credentials.email = event.target.value} id="username-email" placeholder="" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username-email">E-mail</label>
                                <input value={credentials.email} onChange={(event) => credentials.email = event.target.value} id="username-email" placeholder="" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" onChange={(event) => credentials.password = event.target.value} value={credentials.password} placeholder="" type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-default btn-login-submit btn-block m-t-md" onClick={(event)=>this.RegisterAction(event)}>Register</button>
                            </div>
            
                        </form>

                </div>
            </div>
            <div className='col-md-3'></div>
        </div>
    </div>
    );
  }
}
export default Register;
