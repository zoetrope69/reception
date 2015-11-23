import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class FrontInstructionHome extends Component {

  render() {

    const innovationSpace = true;
    const logoImage = require('./logo.png');

    return (
      <main className="page page--front">
      <div className="container">

        <img className="logo" src={logoImage} alt="Logo" />
        <h1>Welcome to the <em>{ innovationSpace ? 'Innovation Space' : 'Cell Block' }</em></h1>

        <Link to="/front/menu" className="button">
            Touch to start&hellip; <Icon name="chevron-right" />
        </Link>

      </div>
      </main>
    );

  }

}