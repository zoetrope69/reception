import React, { Component, PropTypes } from 'react';

export default class Front extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {

    return (
    <div className="front">

      <div className="front__content">
        {this.props.children}
      </div>

    </div>
    );

  }

}
