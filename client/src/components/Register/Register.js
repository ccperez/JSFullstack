import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignForm from '../common/SignForm';

import { userSignUp, isUserExists } from '../../actions/signupActions'
import { addFlashMessage } from '../../actions/flashMessages';

function Register({ userSignUp, isUserExists, addFlashMessage }) {
  const imgBG = { backgroundImage: 'url(img/intro/3.jpg)' };

  return(
    <div className="limiter">
  		<div className="container-login100" style={imgBG}>
  			<div className="wrap-login100 p-t-30 p-b-50">
          <a href="/"><span className="login100-form-title p-b-41">Alstar</span></a>
          <SignForm
            form         = {"Sign Up"}
            formRequest  = {userSignUp}
            isUserExists = {isUserExists}
            flashMessage = {addFlashMessage}
          />
  			</div>
  		</div>
  	</div>
  );
}

Register.propTypes = {
  addFlashMessage : PropTypes.func.isRequired,
       userSignUp : PropTypes.func.isRequired,
     isUserExists : PropTypes.func
}

export default connect(null, { addFlashMessage, userSignUp, isUserExists })(Register);
