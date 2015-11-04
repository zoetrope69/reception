import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { Icon } from 'components';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({ user: state.auth.user, error: state.auth.loginError }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    error: PropTypes.string
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
      <span className={`help-block ${ message.length > 0 ? '' : 'help-block--hidden' }`}>{message}</span>
    );
  }

  render() {

    const { error, logout, user } = this.props;
    const logoImage = require('./logo.png');

    return (
      <div className="page page--sign-in">

        <DocumentMeta title="Sign-in | Innovation Space - Reception App"/>

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
                <Link to="/passwordReset">Forgot your password?</Link>
              </div>

            </form>

          </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.username}.</p>

          <div>
            <button className="button" onClick={logout}>
              <Icon name="exit" /> Sign Out
            </button>
          </div>
        </div>
        }
      </div>
    );
  }
}
