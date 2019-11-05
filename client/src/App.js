import React from 'react';

import HomePage       from './components/HomePage';
import SignUpPage     from './components/Register';
import SignInPage     from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';

export default function App({ location }) {

  switch(location.pathname) {
    case '/signup':
      return <SignUpPage />;
    case '/signin':
      return <SignInPage />;
    case '/forgot_password':
      return <ForgotPassword />;
    default:
      return <HomePage />;
  }

}
