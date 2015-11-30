import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadCompanies } from 'redux/modules/companies';
import { Alert, Icon, Loader, CompanyList } from 'components';

@connect(state => ({
  createError: state.createCompanies.error,
  error: state.companies.error,
  loaded: state.companies.loaded,
  loading: state.companies.loading,
  companies: state.companies.data,
  user: state.auth.user,
}))
export default class AdminCompanies extends Component {
  static propTypes = {
    createError: PropTypes.string,
    error: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    user: PropTypes.object,
    companies: PropTypes.array
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadCompanies());
  }

  render() {

    const { companies, createError, error, loaded, loading, user } = this.props;

    return (
    <div>

      <div className="page-title">
      <div className="container">

        <DocumentMeta title="Companies | Innovation Space Reception App"/>

        <h1><Icon name="briefcase" /> Companies</h1>

        <div className="buttons">
          {user.role === 'admin' && (
          <Link to="/company/new" className="button">
            <Icon name="plus-circle" /> Create New Company
          </Link>
          )}
        </div>

      </div>
      </div>

      {error && <Alert message={error} />}
      {createError && <Alert message={createError} />}

      <main className="page page--companies">
      <div className="container">

        {!loading && loaded && (
          companies ? (
            <CompanyList companies={companies} admin />
          ) : (
            <p>No companies</p>
          )
        )}

        {loading && <Loader />}

      </div>
      </main>

    </div>
    );

  }

}
