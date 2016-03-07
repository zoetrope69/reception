import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';
import { load as loadFront } from 'redux/modules/front';

export default class FrontInstructionHome extends Component {

  static fetchData(getState, dispatch) {
    return dispatch(loadFront());
  }

  render() {
    const innovationSpace = true;
    const logoImage = require('./logo.png');

    return (
      <main className="page page--front">
      <Link to="/front/menu" className="container">

        <img className="logo" src={logoImage} alt="Logo" />
        <h1>Welcome to the <em>{ innovationSpace ? 'Innovation Space' : 'Cell Block' }</em></h1>

        <div className="button">
            Touch to start&hellip; <Icon name="chevron-right" />
        </div>

      </Link>
      </main>
    );
  }

}
