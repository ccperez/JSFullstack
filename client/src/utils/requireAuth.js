import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent) {

  class Authenticate extends React.Component {

    render() {
      return(<ComposedComponent { ...this.props } />);
    }
  }

  Authenticate.propsTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
