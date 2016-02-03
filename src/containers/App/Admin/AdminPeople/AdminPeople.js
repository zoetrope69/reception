import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as peopleActions from 'redux/modules/people';
import { load as loadPeople } from 'redux/modules/people';
import { Link } from 'react-router';
import { Alert, Icon, Loader, PersonList } from 'components';

@connect(
  state => ({
    createError: state.createPeople.error,
    error: state.people.error,
    loaded: state.people.loaded,
    loading: state.people.loading,
    message: state.createPeople.message,
    people: state.people.data,
    user: state.auth.user
  }),
  {...peopleActions })
export default class AdminPeople extends Component {
  static propTypes = {
    createError: PropTypes.string,
    error: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    message: PropTypes.string,
    people: PropTypes.array,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadPeople());
  }

  render() {
    const { createError, error, loaded, loading, message, user } = this.props;
    let { people } = this.props;

    // if no people don't try filter
    if (loaded && people.length > 0) {
      // filter the people by removing the current user
      people = people.filter(person => person._id !== user._id);
    }

    return (
    <div>

      <div className="page-title">
      <div className="container">

        <Helmet title="People | Innovation Space Reception App"/>
        <h1><Icon name="users" /> People</h1>

        <div className="buttons">
          <Link to="/person/new" className="button">
            <Icon name="plus-circle" /> Create New Person
          </Link>
        </div>

      </div>
      </div>

      {error && <Alert message={error} type="warning" />}
      {createError && <Alert message={createError} type="warning" />}

      {message && <Alert message={message} type="success" />}

      <main className="page page--people">
      <div className="container">

        {!loading && loaded && (
          people ? (
            <PersonList people={people} admin />
          ) : (
          <div>
            <p>No people</p>
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
