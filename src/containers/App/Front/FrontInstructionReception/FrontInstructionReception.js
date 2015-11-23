import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class FrontInstructionReception extends Component {

  render() {
    return (
      <main className="page page--instruction-reception">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front">
            <Icon name="chevron-left" /> Home
          </Link>
          <p className="instruction">Thanks!</p>
        </div>

        <div className="instruction-message">
          <Icon name="thumbs-up" large />
          <p><em>They have been notified!</em></p>
          <p>Please wait in <strong>the reception</strong>&hellip;</p>
        </div>

      </div>
      </main>
    );
  }

}
