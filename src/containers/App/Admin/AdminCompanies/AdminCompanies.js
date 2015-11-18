import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadCompanies } from 'redux/modules/companies';
import { Alert, Icon, Loader, CompanyList } from 'components';

@connect(state => ({
  error: state.companies.error,
  loaded: state.companies.loaded,
  loading: state.companies.loading,
  companies: state.companies.data,
  user: state.auth.user,
}))
export default class AdminCompanies extends Component {
  static propTypes = {
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

    const { companies, error, loaded, loading, user } = this.props;

    return (
      <main className="page page--companies">
      <div className="container">

        <DocumentMeta title="Companies | Innovation Space Reception App"/>

        {error && <Alert message={error} />}

        <h1 style={{ color: '#E64B1D' }}>
          Companies

          {user.role === 'admin' && (
          <Link to="/companies/new" style={{ fontSize: '1.25rem', float: 'right' }}
                className="button button--success">
            <Icon name="plus-circle" /> Add new
          </Link>
          )}
        </h1>

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
    );

  }

}
