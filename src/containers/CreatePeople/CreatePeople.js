import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { CreatePeopleForm } from 'components';
import { pushState } from 'redux-router';
import * as createActions from 'redux/modules/create';

@connect(
  state => ({
    error: state.create.error,
    created: state.create.created,
    creating: state.create.creating
  }),
  { ...createActions, pushState})
export default class CreatePeople extends Component {
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
    return (
      <main className="page page--create-people">
      <div className="container">
        <h1>Create New Person</h1>

        <DocumentMeta title="Create New Person | Innovation Space Reception App"/>

        <CreatePeopleForm onSubmit={::this.handleSubmit}/>
      </div>
      </main>
    );
  }
}
