import React, { Component, PropTypes } from 'react';
import { load as loadFront } from 'redux/modules/front';

export default class Front extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  static fetchData(getState, dispatch) {
    const promises = [];
    promises.push(dispatch(loadFront()));
    return Promise.all(promises);
  }

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
