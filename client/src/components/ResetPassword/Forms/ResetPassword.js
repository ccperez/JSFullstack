import React from 'react';
import PropTypes from 'prop-types';
import { withRouter }  from 'react-router-dom';

import InputForm from '../../common/InputForm';
import validateInput from '../../../shared/validations/common';
import FlashMessagesList from '../../Flash/FlashMessagesList';

class ResetPassword extends React.Component {

  state = {
    loading: false, errors: {}, enable: false,
    data: {
      token: this.props.token,
      newPassword: '', cfmPassword: ''
    }
  }

  onChange = (e) => {
    const { data, errors } = this.state;
    const { name, value } = e.target;
    this.setState({
        data: {   ...data, [name]: value },
      errors: { ...errors, [name]: '' }
    });
  }

  onBlur = (e) => {
    let invalid = false;
    const { name, value } = e.target;
    const errors = this.state.errors;
    if (!value) {
      invalid = true;
      errors[name] = "Can't be blank";
    } else {
      if (name === 'cfmPassword') {
        invalid = (this.state.data.newPassword !== value);
        errors[name] = (invalid ? 'Not match to Password' : '');
      }
    }
    this.setState({ errors, enable: invalid });
  }

  onSubmit = (e) => {
    const { formRequest, flashMessage } = this.props;

    e.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true, errors: {} })
      formRequest(this.state.data).then(
        (res) => {
          this.setState({ loading: false });
          flashMessage({ type: 'success', text: 'Reset password successfully.  You can now try to login.' });
          this.props.history.push('/signin');
        },
        (err) => {
          this.setState({ loading: false, errors: err.response.data });
          if (err.response.status === 500)
          flashMessage({ type: 'danger', text: 'Sorry database server it seems has some issue. Please try again later!' });
        }
      );
    }
  }

  isValid() {
    const fields = ['newPassword', 'cfmPassword'];
    const { errors, isValid } = validateInput(this.state.data, fields);
    if (!isValid) this.setState({ errors, enable: true });
    return isValid;
  }

  render() {
    const { loading, data, errors, enable } = this.state;

    const inputElements = [
      {"id": 1, "type": "password", "name": "newPassword", "icon": "&#xe80f;", "title": "New Password"},
      {"id": 2, "type": "password", "name": "cfmPassword", "icon": "&#xe80f;", "title": "Confirmation Password"}
    ]

    const formItems = inputElements.map((element) =>
      <InputForm
        key         = { element.id }
        form        = { "login" }
        field       = { element.name }
        type        = { element.type }
        value       = { data[element.name] }
        onChange    = { this.onChange }
        onBlur      = { this.onBlur }
        icon        = { element.icon }
        placeholder = { element.title }
        error       = { errors[element.name] }
      />
    );

    return(
      <div>
        <FlashMessagesList />
        <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={this.onSubmit}>
          { formItems }
          <div className="container-login100-form-btn m-t-32">
            <button className="login100-form-btn" disabled={loading ? loading : enable}>
              { loading ? <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"> Loading...</span> : "Forgot Password"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  flashMessage : PropTypes.func.isRequired,
   formRequest : PropTypes.func.isRequired
};

export default withRouter(ResetPassword);
