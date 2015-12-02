import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadCompanies } from 'redux/modules/companies';
import { Alert, Icon, Loader, CompanyList } from 'components';

@connect(state => ({
  companies: state.companies.data,
  createError: state.createCompanies.error,
  error: state.companies.error,
  loaded: state.companies.loaded,
  loading: state.companies.loading,
  message: state.createCompanies.message,
  user: state.auth.user
}))
export default class AdminCompanies extends Component {
  static propTypes = {
    companies: PropTypes.array,
    createError: PropTypes.string,
    error: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    message: PropTypes.string,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadCompanies());
  }

  render() {

    const { companies, createError, error, loaded, loading, message, user } = this.props;

    console.log(message);

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

      {error && <Alert message={error} type="warning" />}
      {createError && <Alert message={createError} type="warning" />}

      {message && <Alert message={message} type="success" />}

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
