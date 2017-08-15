import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Redirect } from 'react-router-dom';

import './Login.css';

@inject('UserStore')
@observer
class Login extends Component {
    state = {
        redirectToReferrer: false
    }
  constructor(props){
    super(props);
 }
 
  loginAction(event){
    event.preventDefault();
    this.props.UserStore.loginUser(() =>{
        this.setState({redirectToReferrer: true});
    });
  }

  render() {
    const { credentials, apiAuth, validationError } = this.props.UserStore;
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
                            <legend>Welcome</legend>
                            { validationError ?  <p className="alert alert-danger">{validationError}</p> : '' }
                            <div className="form-group">
                                <label htmlFor="username-email">E-mail</label>
                                <input value={credentials.email} onChange={(event) => credentials.email = event.target.value} id="username-email" placeholder="" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" onChange={(event) => credentials.password = event.target.value} value={credentials.password} placeholder="" type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-default btn-login-submit btn-block m-t-md" onClick={(event)=>this.loginAction(event)}>Login</button>
                            </div>
                            <span className='text-center'><a href="/resetting/request" className="text-sm">Forgot Password?</a></span>
                            <div className="form-group"><br />
                            <br />
                                <p className="text-center m-t-xs text-sm">Do not have an account?</p>
                                <a href="/register" className="btn btn-default btn-block m-t-md register-btn">Create an account</a>
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
export default Login;
