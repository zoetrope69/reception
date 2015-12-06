import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { logout } from 'redux/modules/auth';
import * as passwordActions from 'redux/modules/passwords';
import { checkPasswordToken } from 'redux/modules/passwords';
import { Icon } from 'components';

@connect(
  state => ({
    error: state.passwords.error,
    generateError: state.passwords.generateError,
    isValidToken: state.passwords.isValidToken,
    token: state.passwords.token,
    resetting: state.passwords.resetting,
    successful: state.passwords.successful
  }),
  { ...passwordActions, logout })
export default class PasswordReset extends Component {
  static propTypes = {
    error: PropTypes.string,
    generateError: PropTypes.string,
    isValidToken: PropTypes.bool,
    location: PropTypes.object,
    logout: PropTypes.func.isRequired,
    resetPassword: PropTypes.func,
    resetting: PropTypes.bool,
    successful: PropTypes.bool,
    token: PropTypes.string
  }

  static fetchDataDeferred(getState, dispatch) {
    // check the token before we render this component
    const token = getState().router.location.query.token;
    return dispatch(checkPasswordToken(token));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { resetPassword, token, location } = this.props;
    let invite = false;

    if (typeof location.query.invite !== 'undefined') {
      invite = location.query.invite;
    }

    const password = this.refs.password.value;
    const passwordConfirm = this.refs.passwordConfirm.value;

    resetPassword(token, password, passwordConfirm, invite);

  }

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  render() {

    const { isValidToken, error, generateError, resetting, successful, location } = this.props;
    let invite = false;

    if (typeof location.query.invite !== 'undefined') {
      invite = location.query.invite;
    }

    return (
      <main className="page page--password">
      <div className="container">

        <DocumentMeta title={(invite ? 'Create password' : 'Reset Password' ) + ' | Innovation Space'} />

        {successful && (
        <form>
          <h1>{invite ? 'You\'re all ready to go!' : 'Password reset successful'}</h1>

          <div className="input-wrapper">
            <div className="icon--password">
              <Icon name="thumbs-up" large />
            </div>
            <p>You've got a password now, go log in.</p>
          </div>

          <div className="input-wrapper">
            <Link to="/" onClick={this.props.logout()}>Log in!</Link>
          </div>
        </form>
        )}

        {(!isValidToken && !successful) && (
        <form>

          <h1>Sorry! This link is wrong...</h1>
          <p>You can't reset your password with this link...</p>
          <p>It's either timed out or something went wrong.</p>
          <ol>
            <li>Try clicking the link from your email again.</li>
            <li>Still not working? <Link to="/password/forgot">Reset your password again.</Link></li>
            <li>Let us know the issue with an email to <a href="mailto:reception@rosedigital.co.uk">reception@rosedigital.co.uk</a>.</li>
          </ol>

        </form>
        )}

        {(isValidToken && !successful) && (
        <div>

        <h1>{invite ? `Create password!` : 'Change password'}</h1>

        {invite && (
          <p>You'll be able to change your details soon, for now let's make a password!</p>
        )}

        <form className="form" onSubmit={::this.handleSubmit}>

          <div className="input-wrapper">
            <label htmlFor="password">{invite ? 'Password' : 'New password'}</label>
            <input
              ref="password"
              name="password"
              type="password"
              />
          </div>

          <div className="input-wrapper">
            <label htmlFor="passwordConfirm">{invite ? 'Confirm password' : 'Confirm new password'}</label>
            <input
              ref="passwordConfirm"
              name="passwordConfirm"
              type="password"
              />
          </div>

          <div className={'input-wrapper' + ((error || generateError) ? ' has-error' : '')}>
            <button className="button button--small"
                    onClick={::this.handleSubmit}
                    disabled={resetting}>
              <Icon name={(resetting) ? 'sync' : 'envelope'} spin={resetting} /> {(resetting) ? 'Submitting' : 'Submit'} password
            </button>

            {error && this.renderHelpText(error)}
            {generateError && this.renderHelpText(generateError)}
          </div>

        </form>

        </div>
        )}

      </div>
      </main>
    );
  }
}
