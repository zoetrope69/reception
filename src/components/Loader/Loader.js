import React, { Component } from 'react';
import { Icon } from 'components';

export default class Loader extends Component {
  render() {

    const style = {
      margin: '.5em 0',

      textAlign: 'center',
      fontSize: '2em',
      color: '#AFAFAF'
    };

    return (
      <div className="loading-message" style={style}>
        <Icon name="sync" spin /> Loading
      </div>
    );
  }
}
