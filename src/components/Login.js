import React, { Component } from 'react';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
 }

  componentDidMount(){
    console.log("componentDidMount")
  }

  loginAction(event){
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
            <div className='col-md-3'></div>
            <div className="col-md-6">
                <div className="login-box well">
                        <form action="">
                            <legend>Sign In</legend>
                            <div className="form-group">
                                <label htmlFor="username-email">E-mail</label>
                                <input value={this.state.email} onChange={(event) => this.setState({email:event.target.value})} id="username-email" placeholder="" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input id="password" onChange={(event) => this.setState({password:event.target.value})} value={this.state.password} placeholder="" type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-default btn-login-submit btn-block m-t-md" onClick={(event)=>this.loginAction(event)}>Login</button>
                            </div>
                            <span className='text-center'><a href="/resetting/request" className="text-sm">Forgot Password?</a></span>
                            <div className="form-group">
                                <p className="text-center m-t-xs text-sm">Do not have an account?</p>
                                <a href="/register/" className="btn btn-default btn-block m-t-md">Create an account</a>
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
