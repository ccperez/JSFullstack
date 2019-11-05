import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import    validateInput from '../../shared/validations/contact';
import        InputForm from '../common/InputForm';
import FlashMessagesList from '../Flash/FlashMessagesList';

import { contactMessage } from '../../actions/contactMessageActions';
import { addFlashMessage } from '../../actions/flashMessages';

class Contact extends React.Component {

  state = {
    loading: false, errors: {},
    data: { name:'', email:'', subject:'', message:'' }
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

  onSubmit = (e) => {
    const { contactMessage, addFlashMessage } = this.props;

    e.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true, errors: {} })
      contactMessage(this.state.data).then(
        (res) => {
          this.setState({ loading: false });
          addFlashMessage({ type: 'success', text: 'Your message has been sent.' });
          this.setState({data: {name: '', email: '', subject: '', message: ''}});
        },
        (err) => {
          this.setState({ loading: false, errors: err.response.data });
          if (err.response.status === 500 ) {
            addFlashMessage({ type: 'danger', text: 'Sorry mail server it seems that is not responding. Please try again later!' });
          }
        }
      );
    }
  }

  isValid() {
    const fields = ['name', 'email', 'subject', 'message'];
    const { errors, isValid } = validateInput(this.state.data, fields);

    if (!isValid) this.setState({ errors });

    return isValid;
  }

  render() {
    const { name, title, description, contact } = this.props;
    const { loading, data, errors} = this.state;

    const contactItems = contact.map((contact) =>
      <InputForm
        key         = {contact.id}
        form        = {"contact"}
        field       = {contact.name}
        type        = {contact.type}
        value       = {data[contact.name]}
        onFocus     = {this.onFocus}
        onChange    = {this.onChange}
        placeholder = {contact.title}
        error       = {errors[contact.name]}
      />
    )

    return(
      <section id={ name } className="home-section bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <div className="section-heading">
                <h2>{ title }</h2>
                <div className="heading-line"></div>
                <p>{ description }</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <FlashMessagesList />
              <form className="form-horizontal" onSubmit={this.onSubmit}>
                { contactItems }
                <div className="form-group">
                  <div className="col-md-offset-2 col-md-8">
                    <button type="submit" className="btn btn-theme btn-lg btn-block" disabled={loading}>Send message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Contact.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
   contactMessage: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage, contactMessage })(Contact);
