import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as companiesActions from 'redux/modules/companies';
import { load as loadCompanies } from 'redux/modules/companies';
import { initializeWithKey } from 'redux-form';
import { Alert, Icon, Loader, CompanyForm, ImageForm } from 'components';

@connect(
  state => ({
    companies: state.companies.data,
    error: state.companies.error,
    loaded: state.companies.loaded,
    loading: state.companies.loading,
    user: state.auth.user
  }),
  {...companiesActions, initializeWithKey })
export default class AdminCompany extends Component {
  static propTypes = {
    companies: PropTypes.array,
    error: PropTypes.string,
    initializeWithKey: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    params: PropTypes.object,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadCompanies());
  }

  render() {
    const { companies, error, loaded, loading, params } = this.props;

    const company = companies.find(companiesItem => companiesItem._id === params.company);

    return (
    <div>

      <div className="page-title">
      <div className="container">

        <Helmet title="Company | Innovation Space Reception App"/>

        <h1><Icon name="briefcase" /> Company</h1>

      </div>
      </div>

      {error && <Alert message={error} type="warning" />}

      <main className="page page--company">
      <div className="container">

        {!loading && loaded && (
          company ? (
          <div>
            <ImageForm initialImage={company.image} id={company._id} type="company" />
            <CompanyForm formKey={String(company._id)} key={String(company._id)} initialValues={company} />
          </div>
          ) : (
          <div>
            <h1>Oops! No company</h1>
            <p>No company</p>
          </div>
          )
        )}

        {loading && <Loader />}

      </div>
      </main>

    </div>
    );
  }
}
