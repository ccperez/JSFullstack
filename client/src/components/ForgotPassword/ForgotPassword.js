import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions'

import ForgotPasswordForm from './Forms/ForgotPassword';
import { resetPasswordRequest } from '../../actions/authActions';
import { isUserExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class ForgotPassword extends React.Component {

  logout = (e) => { e.preventDefault(); this.props.logout(); }

  render() {
    const imgBG = { backgroundImage: 'url(img/intro/3.jpg)' };

    const { auth, addFlashMessage, resetPasswordRequest, isUserExists } = this.props;
    const { isAuthenticated } = auth;

    return(
      <div className="limiter">
    		<div className="container-login100" style={imgBG}>
    			<div className="wrap-login100 p-t-30 p-b-50">
            <a href="/"><span className="login100-form-title p-b-41">Alstar</span></a>
            {!isAuthenticated && (
              <ForgotPasswordForm
                formRequest  = { resetPasswordRequest }
                isUserExists = { isUserExists }
                flashMessage = { addFlashMessage }
              />
            )}
            { isAuthenticated && (
              <div className="login100-form text-center">
                <p className="lead">
                  You have signin already! Please <a href="#" onClick={this.logout}>Logout</a> first before doing that process.
                </p>
              </div>
            )}
    			</div>
    		</div>
    	</div>
    );
  }
}

ForgotPassword.propTypes = {
  resetPasswordRequest : PropTypes.func.isRequired,
       addFlashMessage : PropTypes.func.isRequired,
          isUserExists : PropTypes.func.isRequired,
                logout : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { addFlashMessage, resetPasswordRequest, logout, isUserExists })(ForgotPassword);
