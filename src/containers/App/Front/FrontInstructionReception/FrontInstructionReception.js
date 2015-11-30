import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class FrontInstructionReception extends Component {

  state = {
    sending: true
  };

  componentDidMount() {
    // after 5 seconds the message should have been sent
    setTimeout(() => {
      this.setState({ sending: false });
    }, 3000);
  }

  render() {

    const { sending } = this.state;

    return (
      <main className="page page--instruction-reception">
      <div className="container">

        <div className="top-nav" style={{ visibility: (sending ? 'hidden' : 'visible') }}>
          <Link className="back-button" to="/front">
            <Icon name="chevron-left" /> Home
          </Link>
          <p className="instruction">Thanks!</p>
        </div>

        <div className="instruction-message">
          {sending ? (
          <div>
            <Icon name="sync" large spin />
            <p><em>Sending them a notification...</em></p>
          </div>
          ) : (
          <div>
            <Icon name="thumbs-up" large />
            <p><em>They have been notified!</em></p>
            <p>Please wait in <strong>the reception</strong>&hellip;</p>
          </div>
          )}
        </div>

      </div>
      </main>
    );
  }

}
