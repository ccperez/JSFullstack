import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

import InputForm from './InputForm';
import validateInput from '../../shared/validations/common.js';
import FlashMessagesList from '../Flash/FlashMessagesList';

class SignForm extends React.Component {

  state = {
    loading: false, errors: {}, type: '',
    enable: false,  confirmed: false,
    data: { email: '', password: '' }
  }

  onFocus = (e) => {
    const { errors } = this.state;
    const { name } = e.target;
    this.setState({ errors: { ...errors, [name]: '' } })
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
    const { email } = this.state.data;
    if (!value) {
      invalid = true
      errors[name] = "Can't be blank";
    } else {
      if(name === 'email') {
        invalid = !validator.isEmail(value);
        errors[name] = (invalid ? 'Invaid email' : '');
        if (this.props.form === 'Sign Up' && !invalid) {
          this.props.isUserExists(value).then(res => {
            invalid = res.data.user.confirmed;
            errors[name] = (invalid ? 'Email exist' : '');
            this.setState({ errors, enable: invalid, email: value });
          });
        }
      } else {
        if (this.props.form === 'Sign Up') {
          this.props.isUserExists(email).then(res => {
            invalid = res.data.user.confirmed;
            this.setState({ enable: invalid });
          });
        }
      }
    }
    this.setState({ errors, enable: invalid });
  }

  onSubmit = (e) => {
    const { formRequest, flashMessage, form } = this.props;

    e.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true, errors: {} })
      formRequest(this.state.data).then(
        (res) => {
          this.setState({ loading: false, type: form.substr(-2), confirmed: res.data.confirmed });
          this.setState({ data: {email: '', password: ''} });
          if (form === 'Sign In' && res.data.confirmed) window.location.href = '/';
        },
        (err) => {
          this.setState({ loading: false, errors: err.response.data, enable: true });
          if (err.response.status === 500) {
            flashMessage({ type: 'danger', text: 'Sorry database server it seems has some issue. Please try again later!' });
          } else if (err.response.status === 400) {
            if (form === 'Sign In') flashMessage({ type: 'danger', text: 'Ooops. Something went wrong, '+err.response.data.errors.login});
          }
        }
      );
    }
  }

  isValid() {
    const fields = ['email', 'password'];
    const { errors, isValid } = validateInput(this.state.data, fields);
    if (!isValid) this.setState({ errors, enable: true });
    return isValid;
  }

  logout = (e) => { e.preventDefault(); this.props.logout(); }

  render() {
    const signup = [
      {"id": 1, "type": "text",     "name": "email",    "icon": "&#xe82a;", "title": "Email"},
      {"id": 2, "type": "password", "name": "password", "icon": "&#xe80f;", "title": "Password"}
    ]

    const { auth, form } = this.props;
    const { isAuthenticated } = auth;
    const { loading, data, errors, type, enable, confirmed } = this.state;

    const signupItems = signup.map((signup) =>
      <InputForm
        key         = { signup.id }
        form        = { "login" }
        field       = { signup.name }
        type        = { signup.type }
        value       = { data[signup.name] }
        onFocus     = { this.onFocus }
        onChange    = { this.onChange }
        onBlur      = { this.onBlur }
        icon        = { signup.icon }
        placeholder = { signup.title }
        error       = { errors[signup.name] }
      />
    );

    return(
      <div>
        <FlashMessagesList />
        {!isAuthenticated && !type && (
          <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={this.onSubmit}>
            { signupItems }
            <div className="container-login100-form-btn m-t-32">
              <button className="login100-form-btn" disabled={loading ? loading : enable}>
                {loading ? <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"> Loading...</span> : form}
              </button>
            </div>
            <div className="text-center p-t-25">
              {form === 'Sign Up' && (<p><a href="/signin">Already signed up?</a></p>)}
              {form === 'Sign In' && (<p><a href="/signup">Not signed up?</a><br/><a href="/forgot_password">Forgot password?</a></p>)}
            </div>
          </form>
        )}
        {!isAuthenticated && type === 'Up' && (
          <div className="login100-form text-center">
            <h2 className="display-3">Thank You!</h2>
            <p className="lead">
              You signed up successfully. Please check your email for further instructions on how to complete your account setup.
            </p>
          </div>
        )}
        { !isAuthenticated && type === 'In' && !confirmed && (
          <div className="login100-form text-center">
            <p className="lead">
              Your account not yet verify! Please check your email for the instructions how to complete your account setup or <a className="lead" href="/signup">signed up</a> again to send a new instruction email.
            </p>
          </div>
        )}
        { isAuthenticated && !type && (
          <div className="login100-form text-center">
            <p className="lead">
              You have signin already! Please <a href="#" onClick={this.logout}>Logout</a> first before doing that process.
            </p>
          </div>
        )}
      </div>
    )
  }
}

SignForm.propTypes = {
  flashMessage : PropTypes.func.isRequired,
   formRequest : PropTypes.func.isRequired,
        logout : PropTypes.func.isRequired,
  isUserExists : PropTypes.func
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(SignForm);
