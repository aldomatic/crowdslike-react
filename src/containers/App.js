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
import Home from './home/Home';
import About from './about/About';
import Dashboard from './dashboard/Dashboard';

import './App.css';

const App = () => (
    <Switch>
      {/* <Route exact path="/" component={Login} /> */}
      <Route exact path="/" render={() => <Login />} />
      <AuthorizedRoute path="/dashboard" component={Dashboard}/>
      <AuthorizedRoute path="/about" component={About}/>
    </Switch>
);

export default App;
