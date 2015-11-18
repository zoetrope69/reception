import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import * as createActions from 'redux/modules/create';
import { Alert, PersonNewForm } from 'components';

@connect(
  state => ({
    error: state.create.error,
    created: state.create.created,
    creating: state.create.creating
  }),
  { ...createActions, pushState})
export default class AdminPersonNew extends Component {
  static propTypes = {
    error: PropTypes.string,
    created: PropTypes.bool,
    createPerson: PropTypes.func,
    creating: PropTypes.bool,
    pushState: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    const { createPerson } = this.props;
    createPerson(data); // notify the person
    this.props.pushState(null, '/admin/people'); // redirect them back to the thank you message
  }

  render() {

    const { error } = this.props;

    return (
      <main className="page page--create-people">
      <div className="container">

        <DocumentMeta title="Create New Person | Innovation Space Reception App"/>

        {error && <Alert message={error} />}

        <h1 style={{ color: '#E64B1D' }}>Create New Person</h1>

        <PersonNewForm onSubmit={::this.handleSubmit}/>

      </div>
      </main>
    );
  }
}
