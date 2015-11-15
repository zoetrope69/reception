import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { Icon } from 'components';
import { logout } from 'redux/modules/auth';

@connect(
  state => ({ user: state.auth.user }),
  { logout })
export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {

    const { user } = this.props;
    const logoImage = require('./logo.png');

    return (
    <div className="admin">

      <header>

          <IndexLink to="/" className="logo">
              <img src={logoImage} alt="Logo" />
          </IndexLink>

          <nav>
              {user ? (
                  <div>
                      <a href="/logout" className="nav-link" activeClassName="nav-link--active" onClick={::this.handleLogout}>
                          <Icon name="exit" /> Sign-out
                      </a>
                      <Link to="/admin/settings" className="nav-link" activeClassName="nav-link--active">
                          <Icon name="cog" /> Settings
                      </Link>
                      {user.type === 'Staff' && (
                      <div>
                          {/*
                          <Link to="/admin/companies" className="nav-link" activeClassName="nav-link--active">
                              <Icon name="briefcase" /> Companies
                          </Link>
                          */}
                          <Link to="/admin/people" className="nav-link" activeClassName="nav-link--active">
                              <Icon name="users" /> People
                          </Link>
                      </div>
                      )}
                  </div>
              ) : (
                  <Link to="/login" className="nav-link" activeClassName="nav-link--active">
                      <Icon name="enter" /> Sign in
                  </Link>
              )}
          </nav>

      </header>

      <div className="admin__content">
        {this.props.children ? this.props.children : (
            <main className="page page--welcome">
            <div className="container">

              {user && typeof user.firstName !== 'undefined' && (
                <h1>Hey, {user.firstName}!</h1>
              )}

              <p>We're just starting with this app, for now you can <Link to="/admin/settings">update your profile over on the settings page</Link>.</p>
              <p>This app is an work in progress, please do send us your feedback.</p>

              <button className="button" onClick={::this.handleLogout}>
                <Icon name="exit" /> Sign Out
              </button>

            </div>
            </main>
        )}
      </div>

    </div>
    );

  }

}
