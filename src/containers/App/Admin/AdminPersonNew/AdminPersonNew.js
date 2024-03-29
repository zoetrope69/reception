import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import * as createActions from 'redux/modules/createPeople';
import { Alert, Icon, PersonNewForm } from 'components';

@connect(
  state => ({
    created: state.createPeople.created,
    creating: state.createPeople.creating,
    error: state.createPeople.error
  }),
  { ...createActions, pushState})
export default class AdminPersonNew extends Component {
  static propTypes = {
    created: PropTypes.bool,
    create: PropTypes.func,
    creating: PropTypes.bool,
    error: PropTypes.string,
    pushState: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { created } = nextProps;
    if (created) {
      this.props.pushState(null, '/people'); // redirect them back to the thank you message
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
        <Helmet title="Create New Person | Innovation Space Reception App" />
        <h1><Icon name="plus-circle" /> Create New Person</h1>
      </div>
      </div>

      {error && <Alert message={error} type="warning" />}

      <main className="page page--create-people">
      <div className="container">

        <PersonNewForm onSubmit={::this.handleSubmit}/>

      </div>
      </main>

    </div>
    );
  }
}
