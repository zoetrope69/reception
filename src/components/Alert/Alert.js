import React, { Component, PropTypes } from 'react';
import { Icon } from 'components';

export default class Alert extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {

    const { message } = this.props;

    return (
      <div className="alert alert--warning">
      <div className="container">
        <Icon name="warning" /> {message}
      </div>
      </div>
    );
  }
}
