import React from 'react';
import PropTypes from 'prop-types';

import InputForm from '../../common/InputForm';
import validateInput from '../../../shared/validations/common';
import FlashMessagesList from '../../Flash/FlashMessagesList';

class ForgotPassword extends React.Component {

  state = {
    loading: false, enable: false, errors: {},
    success: false, data: { email: '' }
  }

  onFocus = () => {
    this.setState({ errors: {}, enable: false });
  }

  onChange = (e) => {
    const { data, errors } = this.state;
    const { name, value } = e.target;
    this.setState({
        data: {   ...data, [name]: value },
      errors: { ...errors, [name]: '' }
    });
  }

  onBlur = async e => {
    let invalid = false;
    const { name, value } = e.target;
    const errors = this.state.errors;
    if (this.isValid()) {
      const res = await this.props.isUserExists(value);
      invalid = res.data.user.confirmed;
      errors[name] = (invalid ? '' : 'Email not exist');
      this.setState({ errors, enable: !invalid });
    }
  }

  onSubmit = (e) => {
    const { formRequest, flashMessage } = this.props;

    e.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true, errors: {} })
      formRequest(this.state.data).then(
        () => {
          // console.log(res.data);
          this.setState({ loading: false, success: true });
        },
        (err) => {
          this.setState({ loading: false, errors: err.response.data, enable: true });
          if (err.response.status === 500)
          flashMessage({ type: 'danger', text: 'Sorry database server it seems has some issue. Please try again later!' });
        }
      );
    }
  }

  isValid() {
    const fields = ['email'];
    const { errors, isValid } = validateInput(this.state.data, fields);
    if (!isValid) this.setState({ errors, enable: true });
    return isValid;
  }

  render() {
    const { loading, data, errors, success, enable } = this.state;

    const inputElements = [
      {"id": 1, "type": "text", "name": "email", "icon": "&#xe82a;", "title": "Email"}
    ]

    const formItems = inputElements.map((element) =>
      <InputForm
        key         = { element.id }
        form        = { "login" }
        field       = { element.name }
        type        = { element.type }
        value       = { data[element.name] }
        onFocus     = { this.onFocus }
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
        { !success && (
          <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={this.onSubmit}>
            { formItems }
            <div className="container-login100-form-btn m-t-32">
              <button className="login100-form-btn" disabled={loading ? loading : enable}>
                { loading ? <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"> Loading...</span> : "Forgot Password"}
              </button>
            </div>
          </form>
        )}
        { success && (
          <div className="login100-form text-center">
            <h2 className="display-3">Thank You!</h2>
            <p className="lead">
              Your request submit successfully. Please check your email for further instructions on how to complete your reset password process.
            </p>
          </div>
        )}
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  flashMessage : PropTypes.func.isRequired,
   formRequest : PropTypes.func.isRequired,
  isUserExists : PropTypes.func.isRequired
};

export default ForgotPassword;
