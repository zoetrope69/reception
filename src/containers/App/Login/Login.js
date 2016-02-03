import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { Alert, Icon } from 'components';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    error: state.auth.loginError,
    passwordSuccessful: state.passwords.successful,
    user: state.auth.user
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    error: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func,
    passwordSuccessful: PropTypes.bool,
    user: PropTypes.object
  }

  handleSubmit(event) {
    event.preventDefault();

    const { login } = this.props;

    const email = this.refs.email;
    const password = this.refs.password;

    login(email.value, password.value);
  }

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  render() {
    const { error, logout, passwordSuccessful, user } = this.props;
    const logoImage = require('./logo.png');

    return (
    <div>
      {passwordSuccessful && <Alert message="Yes! Go ahead and log in." type="success" />}

      <div className="page page--sign-in">

        <Helmet title="Sign-in | Innovation Space - Reception App"/>


        <img style={{ margin: '0 auto', display: 'block', width: '50%' }} src={logoImage} alt="Logo" />

        <h1>Sign-in</h1>

        {!user &&
          <div>
            <form className="form" onSubmit={::this.handleSubmit}>

              <div style={{ paddingBottom: '1em' }} className={'input-wrapper' + (error ? ' has-error' : '')}>
                {error && (
                  <span style={{ top: 0, right: 0, width: '100%' }}
                        className="help-block">{error !== '' ? error : 'Bad login information'}</span>
                )}
              </div>

              <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                  ref="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane.smith@example.com"
                  />
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  ref="password"
                  type="password"
                  />
              </div>

              <div className="input-wrapper">

                <button className="button" onClick={::this.handleSubmit} disabled={false}>
                  <Icon name="enter"/> Sign in
                </button>
              </div>

              <div className="input-wrapper">
                <Link to="/password/forgot">Forgot your password?</Link>
              </div>

            </form>

          </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.email}.</p>

          <div>
            <button className="button" onClick={logout}>
              <Icon name="exit" /> Sign Out
            </button>
          </div>
        </div>
        }
      </div>

    </div>
    );
  }
}
