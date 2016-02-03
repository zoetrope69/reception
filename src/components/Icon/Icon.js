import React, { Component, PropTypes } from 'react';

export default class Icon extends Component {
  static propTypes = {
    large: PropTypes.bool,
    name: PropTypes.string.isRequired,
    spin: PropTypes.bool
  }

  render() {
    const { large, name, spin } = this.props;

    let className = ` icon icon--${name} `;

    if (large) {
      className += ' icon--large ';
    }

    if (spin) {
      className += ' icon--spin ';
    }

    return (
      <svg className={className}>
        <use xlinkHref={'#lnr-' + name }></use>
      </svg>
    );
  }
}
