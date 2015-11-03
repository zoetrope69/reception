import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class InstructionHelp extends Component {

  render() {
    return (
      <main className="page page--instruction-help">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front/menu">
            <Icon name="chevron-left" large /> Back
          </Link>
          <p className="instruction">Help</p>
        </div>

        <div className="instruction-message">
          <Icon name="question-circle" large />
          <p><em>Staff can answer any general stuff!</em></p>
          <p>You can find them on <strong>the first floor</strong>&hellip;</p>
        </div>

      </div>
      </main>
    );
  }

}
