import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from "mobx-react"
import Layout from './layout/layout';

@inject('UserStore')
@observer
class AuthorizedRoute extends Component {
  render() {
    const { component: Component, pending, logged, UserStore, ...rest } = this.props
    return (
      <Route {...rest} render={props => {
        return UserStore.fakeAuth.isAuthenticated
          ? <Layout><Component {...props} /></Layout>
          : <Redirect to={{pathname: '/', state: { from: props.location }}}  />
      }} />
    )
  }
}

export default AuthorizedRoute
