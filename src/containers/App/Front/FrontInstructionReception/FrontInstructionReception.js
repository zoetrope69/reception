import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

@connect(
  state => ({
    error: state.notifications.error,
  }),
  { pushState })
export default class FrontInstructionReception extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired
  }

  state = {
    sending: true
  };

  componentDidMount() {
    // after 3 seconds the message should have been sent
    this.sendingTimer = setTimeout(() => {
      this.setState({ sending: false });
    }, 3000);

    // after 10 seconds the page should go back to the home
    this.timeoutTimer = setTimeout(() => {
      this.props.pushState(null, '/front'); // redirect to homepage
    }, 13000);
  }

  componentWillUnmount() {
    clearInterval(this.sendingTimer);
    clearInterval(this.timeoutTimer);
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
