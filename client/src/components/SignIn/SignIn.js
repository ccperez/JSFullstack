import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignForm from '../common/SignForm';

import { userSignIn } from '../../actions/authActions'
import { addFlashMessage } from '../../actions/flashMessages';

function SignIn({ userSignIn, addFlashMessage }) {
  const imgBG = { backgroundImage: 'url(img/intro/1.jpg)' };

  return(
    <div className="limiter">
  		<div className="container-login100" style={imgBG}>
  			<div className="wrap-login100 p-t-30 p-b-50">
          <a href="/"><span className="login100-form-title p-b-41">Alstar</span></a>
          <SignForm
            form         = {"Sign In"}
            formRequest  = {userSignIn}
            flashMessage = {addFlashMessage}
          />
  			</div>
  		</div>
  	</div>
  );
}

SignIn.propTypes = {
  addFlashMessage : PropTypes.func.isRequired,
       userSignIn : PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage, userSignIn })(SignIn);
