import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { Icon } from 'components';
import { logout } from 'redux/modules/auth';
import { isLoaded as isPeopleLoaded, load as loadPeople } from 'redux/modules/people';
import { isLoaded as isCompaniesLoaded, load as loadCompanies } from 'redux/modules/companies';

@connect(
  state => ({
    companies: state.companies.data,
    error: state.companies.error,
    loaded: state.companies.loaded,
    loading: state.companies.loading,
    user: state.auth.user
  }),
  { logout })
export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.object,
    companies: PropTypes.array,
    error: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isPeopleLoaded(getState())) {
      promises.push(dispatch(loadPeople()));
    }
    if (!isCompaniesLoaded(getState())) {
      promises.push(dispatch(loadCompanies()));
    }
    return Promise.all(promises);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {

    const { companies, loaded, loading, user } = this.props;

    let company = null;
    if (!loading && loaded && companies.length > 0) {
      company = companies[0];
    }

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
            {user.role === 'owner' && (
              <Link to={'/company/' + (company && company._id)} className="nav-link" activeClassName="nav-link--active">
                <Icon name="briefcase" /> Company
              </Link>
            )}
            {user.role === 'admin' && (
              <Link to="/companies" className="nav-link" activeClassName="nav-link--active">
                <Icon name="briefcase" /> Companies
              </Link>
            )}
            {(user.role === 'admin' || user.role === 'owner') && (
              <Link to="/people" className="nav-link" activeClassName="nav-link--active">
                <Icon name="users" /> People
              </Link>
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
