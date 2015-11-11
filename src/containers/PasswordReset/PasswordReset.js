import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as passwordActions from 'redux/modules/passwords';

@connect(
  state => ({ isValidToken: state.passwords.isValidToken }),
  passwordActions)
export default class PasswordReset extends Component {
  static propTypes = {
    isValidToken: PropTypes.bool,
    checkPasswordToken: PropTypes.func,
    token: PropTypes.string,
    location: PropTypes.object
  }

  componentDidMount() {

    const { checkPasswordToken, location } = this.props;

    let { token } = this.props;

    // TODO: check if this is the best way to get the token
    token = location.query.token;

    console.log(token);

    // if there isnt a token sent then redirect straight away
    if (token && typeof token !== 'undefined' && token.length > 0) {
      checkPasswordToken(token);
    }

  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {

    const { isValidToken } = this.props;

    return (
      <main className="page page--password">
      <div className="container">

        <DocumentMeta title="Reset Password | Innovation Space"/>

        {isValidToken ? (
        <div>

        <h1>Change password</h1>

        <form className="form" onSubmit={::this.handleSubmit}>

          Password Reset

        </form>

      </div>
      ) : (
        <h1>Invalid password token</h1>
      )}

      </div>
      </main>
    );
  }
}
