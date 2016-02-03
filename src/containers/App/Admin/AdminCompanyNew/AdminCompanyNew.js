import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import * as createActions from 'redux/modules/createCompanies';
import { Alert, Icon, CompanyNewForm } from 'components';

@connect(
  state => ({
    error: state.createCompanies.error,
    created: state.createCompanies.created,
    creating: state.createCompanies.creating
  }),
  { ...createActions, pushState})
export default class AdminCompanyNew extends Component {
  static propTypes = {
    error: PropTypes.string,
    created: PropTypes.bool,
    create: PropTypes.func,
    creating: PropTypes.bool,
    pushState: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { created } = nextProps;
    if (created) {
      this.props.pushState(null, '/companies'); // redirect them back to the thank you message
    }
  }

  handleSubmit = (data) => {
    const { create } = this.props;
    create(data); // notify the person
  }

  render() {
    const { error } = this.props;

    return (
    <div>

      <div className="page-title">
      <div className="container">
        <Helmet title="Create New Company | Innovation Space Reception App" />
        <h1><Icon name="plus-circle" /> Create New Company</h1>
      </div>
      </div>

      {error && <Alert message={error} type="warning" />}

      <main className="page page--create-companies">
      <div className="container">

        <CompanyNewForm onSubmit={::this.handleSubmit}/>

      </div>
      </main>

    </div>
    );
  }
}
