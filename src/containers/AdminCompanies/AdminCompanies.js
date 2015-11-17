import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon, CompanyList } from 'components';
import { load as loadCompanies } from 'redux/modules/settingsCompanies';

@connect(state => ({
  user: state.auth.user,
  companies: state.settingsCompanies.data
}))
export default class AdminCompanies extends Component {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadCompanies());
  }

  render() {

    const { companies, user } = this.props;

    return (
      <main className="page page--companies">
      <div className="container">

        {user && user.role === 'admin' && (
        <Link to="/admin/company/new" style={{ float: 'right' }}
                className="button button--success">
          <Icon name="plus-circle" /> Add new
        </Link>
        )}

        <h1>Companies</h1>

        <CompanyList companies={companies} admin />

      </div>
      </main>
    );

  }

}
