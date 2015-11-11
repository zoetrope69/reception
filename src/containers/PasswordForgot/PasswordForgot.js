import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as passwordActions from 'redux/modules/passwords';
import { Icon } from 'components';

@connect(
  state => ({ isValidEmail: state.passwords.isValidEmail, sent: state.passwords.sentEmail }),
  passwordActions)
export default class PasswordForgot extends Component {
  static propTypes = {
    isValidEmail: PropTypes.bool,
    generatePasswordToken: PropTypes.func.isRequired,
    sent: PropTypes.bool,
    location: PropTypes.object
  }

  handleSubmit(event) {
    event.preventDefault();

    const { generatePasswordToken } = this.props;

    const input = this.refs.email;

    generatePasswordToken(input.value);

    input.value = '';
  }

  render() {

    const { sent } = this.props;

    return (
      <main className="page page--password">
      <div className="container">

        <DocumentMeta title="Forgot Password | Innovation Space"/>

        <h1>Reset password</h1>

        <form className="form" onSubmit={::this.handleSubmit}>

          {!sent ? (
          <div>

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
              <button className="button button--small"
                      onClick={::this.handleSubmit}
                      disabled={false}>
                <Icon name="envelope" /> Begin reset
              </button>
            </div>

            <Link to="/login">Back to sign in...</Link>

          </div>
          ) : (
          <div>

            {/* display this if password email sent */}

            <div className="input-wrapper">
              <Icon name="envelope" large />

            <p>A reset link has been sent!</p>
            </div>

            <div className="input-wrapper">
              <Link to="/login">Sign in</Link>
            </div>

            <div className="input-wrapper">
              <a href="#" >Resend email</a>
            </div>

          </div>
          )}

        </form>

      </div>
      </main>
    );
  }
}
