import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';

import Layout from './layout/layout';
import AuthorizedRoute from './AuthorizedRoute';
import { Observer } from "mobx-react";
import Login from './login/Login';
import Register from './register/Register';
import Home from './home/Home';
import About from './about/About';
import Dashboard from './dashboard/Dashboard';

import './App.css';

const App = () => (
    <Switch>
      <Route exact path="/" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
      <AuthorizedRoute path="/dashboard" component={Dashboard}/>
      <AuthorizedRoute path="/about" component={About}/>
    </Switch>
);
export default App;
