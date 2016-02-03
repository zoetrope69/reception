import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as passwordActions from 'redux/modules/passwords';
import { Icon } from 'components';

@connect(
  state => ({
    error: state.passwords.generateError,
    generating: state.passwords.generating,
    isValidEmail: state.passwords.isValidEmail,
    sent: state.passwords.sentEmail
  }),
  passwordActions)
export default class PasswordForgot extends Component {
  static propTypes = {
    error: PropTypes.string,
    generatePasswordToken: PropTypes.func.isRequired,
    generating: PropTypes.bool,
    isValidEmail: PropTypes.bool,
    location: PropTypes.object,
    sent: PropTypes.bool
  }

  handleSubmit(event) {
    event.preventDefault();

    const { generatePasswordToken } = this.props;

    const input = this.refs.email;

    generatePasswordToken(input.value);

    input.value = '';
  }

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  render() {
    const { error, generating, sent } = this.props;

    return (
      <main className="page page--password">
      <div className="container">

        <Helmet title="Forgot Password | Innovation Space"/>

        <h1>Reset password</h1>

        <form className="form" onSubmit={::this.handleSubmit}>

          <div style={{ paddingBottom: '1em' }} className={'input-wrapper' + (error ? ' has-error' : '')}>
            {error && (
              <span style={{ top: 0, right: 0, width: '100%' }}
                    className="help-block">{error !== '' ? error : 'Bad information'}</span>
            )}
          </div>

          {!sent ? (
          <div>

            <div className="input-wrapper">
              <label htmlFor="email">Email address</label>
              <input
                ref="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                />
            </div>

            <div className="input-wrapper">
              <button className="button button--small"
                      onClick={::this.handleSubmit}
                      disabled={generating}>
                <Icon name={(generating) ? 'sync' : 'envelope'} spin={generating} /> {(generating) ? 'Sending email' : 'Begin reset'}
              </button>
            </div>

            <Link to="/login">Back to sign in...</Link>

          </div>
          ) : (
          <div>

            {/* display this if password email sent */}

            <div className="input-wrapper">
              <div className="icon--password">
                <Icon name="envelope" large />
              </div>

              <p>A reset link has been sent!</p>

              <ol>
                <li>Go check for an email</li>
              </ol>
            </div>

          </div>
          )}

        </form>

      </div>
      </main>
    );
  }
}
