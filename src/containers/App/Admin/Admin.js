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
            <Link to="/profile" className="nav-link" activeClassName="nav-link--active">
              <Icon name="user" /> Profile
            </Link>
            {(user.role === 'admin' || user.role === 'owner') && (
            <div>
              <Link to="/companies" className="nav-link" activeClassName="nav-link--active">
                <Icon name="briefcase" /> {user.role === 'owner' ? 'Company' : 'Companies'}
              </Link>
              <Link to="/people" className="nav-link" activeClassName="nav-link--active">
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
        {this.props.children}
      </div>

    </div>
    );

  }

}
