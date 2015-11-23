import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as companiesActions from 'redux/modules/companies';
import { load as loadCompanies } from 'redux/modules/companies';
import { initializeWithKey } from 'redux-form';
import { Alert, Icon, Loader, CompanyForm } from 'components';

@connect(
  state => ({
    companies: state.companies.data,
    editing: state.companies.editing,
    error: state.companies.error,
    loaded: state.companies.loaded,
    loading: state.companies.loading,
    user: state.auth.user
  }),
  {...companiesActions, initializeWithKey })
export default class AdminCompany extends Component {
  static propTypes = {
    companies: PropTypes.array,
    editing: PropTypes.object.isRequired,
    editStart: PropTypes.func.isRequired,
    editStop: PropTypes.func.isRequired,
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

  handleEdit(company) {
    const { editStart } = this.props; // eslint-disable-line no-shadow
    return () => {
      editStart(String(company._id));
    };
  }

  render() {

    const { companies, editing, editStop, error, loaded, loading, params } = this.props;

    const company = companies.find(companiesItem => companiesItem._id === params.company);

    return (
    <div>

      <div className="page-title">
      <div className="container">

        <DocumentMeta title="Company | Innovation Space Reception App"/>

        <h1><Icon name="briefcase" /> Company</h1>

        <div className="buttons">
          {!loading && loaded && company && (
            editing[company._id] ? (
              <button key={'edit' + company._id}
                      style={{ float: 'right' }}
                      className="button"
                      onClick={() => editStop(company._id)}>
                <Icon name="trash" /> Cancel
              </button>
            ) : (
              <button key={'edit' + company._id}
                      style={{ float: 'right' }}
                      className="button"
                      onClick={::this.handleEdit(company)}>
                <Icon name="pencil" /> Edit
              </button>
            )
          )}
        </div>

      </div>
      </div>

      {error && <Alert message={error} />}

      <main className="page page--company">
      <div className="container">

        {!loading && loaded && (
          company ? (
            <CompanyForm formKey={String(company._id)} key={String(company._id)} initialValues={company} editing={!editing[company._id]} />
          ) : (
            <p>No company</p>
          )
        )}

        {loading && <Loader />}

      </div>
      </main>

    </div>
    );
  }
}
