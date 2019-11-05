import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon } from "semantic-ui-react";

import ResetPasswordForm from './Forms/ResetPassword';
import { validateToken, resetPassword } from '../../actions/authActions'
import { addFlashMessage } from '../../actions/flashMessages';

class ResetPassword extends React.Component {

  state = { loading: true, success: false }

  componentDidMount() {
    const { validateToken, match } = this.props;
    validateToken(match.params.token)
       .then(() => this.setState({ loading: false, success: true  }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const imgBG = { backgroundImage: 'url(../img/intro/1.jpg)' };
    const { addFlashMessage, resetPassword, match } = this.props;
    const { loading, success } = this.state;

    return(
      <div className="limiter">
    		<div className="container-login100" style={imgBG}>
    			<div className="wrap-login100 p-t-30 p-b-50">
            <a href="/"><span className="login100-form-title p-b-41">Alstar</span></a>
            { loading && !success && (
              <div className="login100-form text-center">
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Header>Validating password</Message.Header>
                </Message>
              </div>
            )}
            {!loading && success && (
              <ResetPasswordForm
                loading      = { loading }
                success      = { success }
                token        = { match.params.token }
                formRequest  = { resetPassword }
                flashMessage = { addFlashMessage }
              />
            )}
            {!loading && !success && (
              <div className="login100-form text-center">
                <Message negative icon>
                  <Icon name="warning sign" />
                  <Message.Content>
                    <Message.Header>Ooops. Invalid token.</Message.Header>
                  </Message.Content>
                </Message>
              </div>
            )}
    			</div>
    		</div>
    	</div>
    );
  }
}

ResetPassword.propTypes = {
  addFlashMessage : PropTypes.func.isRequired,
    validateToken : PropTypes.func.isRequired,
    resetPassword : PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage, resetPassword, validateToken })(ResetPassword);
