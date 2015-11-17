import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { CreateCompaniesForm } from 'components';
import { pushState } from 'redux-router';
import * as createActions from 'redux/modules/create';

@connect(
  state => ({
    error: state.create.error,
    created: state.create.created,
    creating: state.create.creating
  }),
  { ...createActions, pushState})
export default class CreateCompanies extends Component {
  static propTypes = {
    error: PropTypes.string,
    created: PropTypes.bool,
    createCompany: PropTypes.func,
    creating: PropTypes.bool,
    pushState: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    const { createCompany } = this.props;
    createCompany(data); // notify the person
    this.props.pushState(null, '/admin/companies'); // redirect them back to the thank you message
  }

  render() {
    return (
      <main className="page page--create-companies">
      <div className="container">
        <h1>Create New Company</h1>

        <DocumentMeta title="Create New Company | Innovation Space Reception App"/>

        <CreateCompaniesForm onSubmit={::this.handleSubmit}/>
      </div>
      </main>
    );
  }
}
