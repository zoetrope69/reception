import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { Icon } from 'components';

@connect(
  state => ({ user: state.auth.user }),
  { logout })
export default class Admin extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {

    const { user } = this.props;

    return (
    <div>

      <div className="page-title">
      <div className="container">
        <DocumentMeta title="Home | Innovation Space Reception App"/>
        <h1><Icon name="home" /> Home</h1>
      </div>
      </div>

      <main className="page page--welcome">
      <div className="container" style={{ maxWidth: '40em', fontSize: '1.25em' }}>

        {user && typeof user.firstName !== 'undefined' && (
          <h1>Hey, {user.firstName}!</h1>
        )}

        <p>This app is an work in progress, so everyone's feedback is really welcome!.</p>

        <p>We're looking to grow this app based on everyone's feedback, so <a href="mailto:receptionfeedback@rosedigital.co.uk">please do tell us</a>!</p>

        <h2 style={{ marginBottom: '.5em', fontWeight: 400 }}>Things on the roadmap:</h2>

        <ul style={{ marginBottom: '1em', listStyle: 'inside' }}>
          <li>Profile images and company logos</li>
          <li>Multiple email addresses and phone numbers</li>
          <li>Improved company pages on the app!</li>
          <li>And more...</li>
        </ul>

      </div>
      </main>

    </div>
    );

  }

}
