import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as companiesActions from 'redux/modules/companies';
import { load as loadCompanies } from 'redux/modules/companies';
import { initializeWithKey } from 'redux-form';
import { Icon, CompanyForm } from 'components';

@connect(
  state => ({
    editing: state.companies.editing,
    error: state.companies.error,
    companies: state.companies.data,
    user: state.auth.user
  }),
  {...companiesActions, initializeWithKey })
export default class PeopleSettings extends Component {
  static propTypes = {
    companies: PropTypes.array,
    editing: PropTypes.object.isRequired,
    editStart: PropTypes.func.isRequired,
    editStop: PropTypes.func.isRequired,
    error: PropTypes.string,
    initializeWithKey: PropTypes.func.isRequired,
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

    const { editStop, companies, error, editing, params } = this.props;

    console.log(params);

    const company = companies.find(companyItem => companyItem._id === params.company);

    return (
      <main className="page page--settings">
      <div className="container">

      <DocumentMeta title="Settings" />

      {company && (

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

      <h1>Settings</h1>

      {error && (
      <div className="alert alert--danger" role="alert">
        {error}
      </div>
      )}

      {company && (
        <CompanyForm formKey={String(company._id)} key={String(company._id)} initialValues={company} editing={!editing[company._id]} />
      )}

    </div>
    </main>
    );
  }
}
