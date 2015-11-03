import React, {Component, PropTypes} from 'react';

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    large: PropTypes.bool,
  }

  render() {

    const {name, large} = this.props; // eslint-disable-line no-shadow

    let className = ` icon icon--${name} `;

    if (large) {
      className += ' icon--large ';
    }

    return (
      <svg className={className}>
        <use xlinkHref={'#lnr-' + name }></use>
      </svg>
    );
  }
}
