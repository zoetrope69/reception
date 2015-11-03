import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';
import { Icon } from 'components';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {

    const {user, logout} = this.props;

    return (user &&
      <main className="page page--sign-in-success">
      <div className="container">

        <h1>Welcome!</h1>

        <p>Hi, {user.username}! You have just successfully logged in, you can now manage your profile from the <Link to="/admin/settings">settings</Link> page.</p>
        <p>This app is an work in progress, please do send us your feedback. </p>

        <button className="button" onClick={logout}>
          <Icon name="exit" /> Sign Out
        </button>

      </div>
      </main>
    );

  }
}
