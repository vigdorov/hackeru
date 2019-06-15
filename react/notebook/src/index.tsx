import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store/configure_store';

import App from './App';
import * as serviceWorker from './serviceWorker';

export const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
