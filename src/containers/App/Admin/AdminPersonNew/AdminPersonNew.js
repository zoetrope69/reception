import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as createActions from 'redux/modules/create';
import { Alert, Icon, Loader, PersonNewForm } from 'components';

@connect(
  state => ({
    created: state.create.created,
    creating: state.create.creating,
    error: state.create.error
  }),
  { ...createActions})
export default class AdminPersonNew extends Component {
  static propTypes = {
    created: PropTypes.bool,
    createPerson: PropTypes.func,
    creating: PropTypes.bool,
    error: PropTypes.string
  }

  handleSubmit = (data) => {
    const { createPerson } = this.props;
    createPerson(data); // notify the person
  }

  render() {

    const { created, creating, error } = this.props;

    return (
    <div>

      <div className="page-title">
      <div className="container">
        <DocumentMeta title="Create New Person | Innovation Space Reception App" />
        <h1><Icon name="plus-circle" /> Create New Person</h1>
      </div>
      </div>

      {error && <Alert message={error} />}

      <main className="page page--create-people">
      <div className="container">

        {!created ? (
        <div>
          {creating && <Loader />}
          <PersonNewForm onSubmit={::this.handleSubmit}/>
        </div>
        ) : (
        <div>
          <p>Person created!</p>
          <Link to="/people">Go back to people...</Link>
        </div>
        )}

      </div>
      </main>

    </div>
    );
  }
}
