import React, { Component, PropTypes } from 'react';
import { Icon } from 'components';

export default class Alert extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string
  }

  render() {

    const { message, type = 'info' } = this.props;

    const icons = {
      'error': 'cross-circle',
      'warning': 'warning',
      'info': 'question-circle',
      'success': 'checkmark-circle'
    };

    const icon = icons[type];

    return (
      <div className={`alert alert--${type}`}>
      <div className="container">
        <Icon name={icon} /> {message}
      </div>
      </div>
    );
  }
}
