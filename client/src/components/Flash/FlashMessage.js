import React from 'react';
import PropTypes from 'prop-types';

export default class FlashMessage extends React.Component {

  onDeleteFlashMessage = (id) => {
    window.setTimeout(() => {
      this.props.deleteFlashMessage(id);
    }, 3000)
  }

  render() {

    const { id, type, text } = this.props.message;

    return(
      <div className={'alert alert-'+type}>
        <button className='close' onClick={this.onDeleteFlashMessage(id)}>
          <span>&times;</span>
        </button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}
