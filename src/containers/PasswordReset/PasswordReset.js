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
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    return (
      <div className="loginPage container">
        <DocumentMeta title="React Redux Example: Login"/>
        <h1>Sign in</h1>
        {!user &&
          <div>
            <form className="form" onSubmit={::this.handleSubmit}>


                <div>

                  <h3 className="input-header">Reset password</h3>

                  <div className="input-wrapper">
                    <label htmlFor="email">Email address</label>
                    <input
                      ref="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      />
                  </div>

                  <div className="input-wrapper">
                    <button className="button button--small" type="submit" disabled={false}>
                      <Icon name="envelope" /> Begin reset
                    </button>
                  </div>

                  <Link to="/login">Back to sign in...</Link>

              </div>

              {/* display this if password email sent */}

                <div>
                  <h3 className="input-header">Reset email sent</h3>

                  <div className="input-wrapper">
                      <Icon name="envelope" large />

                      <p>A reset link has been sent to </p>
                  </div>

                  <div className="input-wrapper">
                      <Link to="/login">Sign in</Link>
                  </div>

                  <div className="input-wrapper">
                      <a href="#" >Resend email</a>
                  </div>

                </div>

            </form>

            {/* This will "log you in" as this user, storing the username in the session of the API server. */}

          </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button onClick={logout}>
              <Icon name="exit" /> Sign Out
            </button>
          </div>
        </div>
        }
      </div>
    );
  }
}
