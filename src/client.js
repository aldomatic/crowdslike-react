import App from './containers/App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'mobx-react';
import userStore from "./stores/UserStore";

render(
  <BrowserRouter history={createHistory()}>
    <Provider UserStore={userStore}>
      <App />
    </Provider>  
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
