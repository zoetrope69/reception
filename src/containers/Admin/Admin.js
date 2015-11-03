import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { Icon } from 'components';
import { logout } from 'redux/modules/auth';

const NavbarLink = ({to, className, component, children}) => {
  const Comp = component || Link;

  return (
    <Comp to={to} className={className} activeStyle={{
      color: '#33e0ff'
    }}>
      {children}
    </Comp>
  );
};

@connect(
  state => ({ user: state.auth.user }),
  { logout }
)
export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {

    const {user} = this.props;
    const logoImage = require('./logo.png');

    return (
    <div className="admin">

      <header>

          <NavbarLink to="/" className="logo" component={IndexLink}>
              <img src={logoImage} alt="Logo" />
          </NavbarLink>

          <nav>
              {user ? (
                  <div>
                      <a href="/logout" className="nav-link" activeClassName="nav-link--active" onClick={::this.handleLogout}>
                          <Icon name="exit" /> Sign-out
                      </a>
                      <Link to="/admin/settings" className="nav-link" activeClassName="nav-link--active">
                          <Icon name="cog" /> Settings
                      </Link>
                      <div>
                          <Link to="/admin/companies" className="nav-link" activeClassName="nav-link--active">
                              <Icon name="briefcase" /> Companies
                          </Link>
                          <Link to="/admin/people" className="nav-link" activeClassName="nav-link--active">
                              <Icon name="users" /> People
                          </Link>
                      </div>
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
