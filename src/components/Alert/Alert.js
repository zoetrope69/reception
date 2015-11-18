import React, { Component, PropTypes } from 'react';
import { Icon } from 'components';

export default class Alert extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {

    const { message } = this.props;

    const style = {
      padding: '.5em',
      marginBottom: '1em',

      textAlign: 'center',
      fontSize: '1em',
      fontWeight: 300,
      color: '#753939',

      borderBottomLeftRadius: '2px',
      borderBottomRightRadius: '2px',
      background: '#FFB5B5',
    };


    return (
      <div className="alert" style={style}>
        <Icon name="warning" /> {message}
      </div>
    );
  }
}
