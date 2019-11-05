import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import checkAuth from "./utils/checkAuth";

import App from './App';
import ConfirmationPage from './components/ConfirmationPage';
import ResetPassword from './components/ResetPassword';

import * as serviceWorker from './serviceWorker';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

checkAuth(store);

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path = "/"                component = {App} />
        <Route exact path = "/signup"          component = {App} />
        <Route exact path = "/signin"          component = {App} />
        <Route exact path = "/forgot_password" component = {App} />

        <Route exact path = "/signup/confirmation/:token" component = {ConfirmationPage} />
        <Route exact path = "/reset_password/:token"      component = {ResetPassword} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
