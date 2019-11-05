import React from "react";
import PropTypes from "prop-types";

import { Message, Icon } from "semantic-ui-react";

import { connect } from "react-redux";
import { confirm } from "../../actions/authActions";

class ConfirmationPage extends React.Component {

  state = { loading: true, success: false };

  componentDidMount() {
    const { confirm, match } = this.props;
    confirm(match.params.token)
      .then( () => this.setState({ loading: false, success: true  }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const imgBG = { backgroundImage: 'url(../../img/intro/3.jpg)' };
    const { loading, success } = this.state;

    return (
      <div className="limiter">
    		<div className="container-login100" style={imgBG}>
    			<div className="wrap-login100 p-t-30 p-b-50">
            <a href="/"><span className="login100-form-title p-b-41">Alstar</span></a>
            {loading && (
              <div className="login100-form text-center">
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Header>Validating your email</Message.Header>
                </Message>
              </div>
            )}
            {!loading &&  success && (
              <div className="login100-form text-center">
                <h2 className="display-3">Thank You!</h2>
                <p className="lead">
                  Your account has been verified.<br/>You can now try to <a className="lead" href="/signin">login</a>.
                </p>
              </div>
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

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);
