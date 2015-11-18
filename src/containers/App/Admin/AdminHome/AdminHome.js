import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { Link } from 'react-router';
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
      <main className="page page--welcome">
      <div className="container">

        <DocumentMeta title="Home | Innovation Space Reception App"/>

        {user && typeof user.firstName !== 'undefined' && (
          <h1>Hey, {user.firstName}!</h1>
        )}

        <p>We're just starting with this app, for now you can <Link to="/profile">update your profile</Link>.</p>
        <p>This app is an work in progress, please do send us your feedback.</p>

        <button className="button" onClick={::this.handleLogout}>
          <Icon name="exit" /> Sign Out
        </button>

      </div>
      </main>
    );

  }

}
