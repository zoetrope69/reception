import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { Icon } from 'components';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.refs.email;
    const password = this.refs.password;

    this.props.login(email.value, password.value);

  }

  render() {

    const {user, logout} = this.props;

    return (
      <div className="page page--login">
        <DocumentMeta title="Login | Innovation Space - Reception App"/>
        <h1>Sign in</h1>
        {!user &&
          <div>
            <form className="form" onSubmit={::this.handleSubmit}>

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
          <p>You are currently logged in as {user.email}.</p>

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
