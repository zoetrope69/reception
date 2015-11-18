import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as peopleActions from 'redux/modules/people';
import { load as loadPeople } from 'redux/modules/people';
import { Link } from 'react-router';
import { Alert, Icon, Loader, PersonList } from 'components';

@connect(
  state => ({
    error: state.people.error,
    loaded: state.people.loaded,
    loading: state.people.loading,
    people: state.people.data,
    user: state.auth.user,
  }),
  {...peopleActions })
export default class AdminPeople extends Component {
  static propTypes = {
    error: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    user: PropTypes.object,
    people: PropTypes.array
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadPeople());
  }

  render() {

    const { error, loaded, loading, user } = this.props;
    let { people } = this.props;

    // if no people don't try filter
    if (loaded && people.length > 0) {
      // filter the people by removing the current user
      people = people.filter(person => person._id !== user._id);
    }

    return (
      <main className="page page--people">
      <div className="container">

        <DocumentMeta title="People | Innovation Space Reception App"/>

        {error && <Alert message={error} />}

        <h1 style={{ color: '#E64B1D' }}>
          People

          <Link to="/people/new" style={{ fontSize: '1.25rem', float: 'right' }}
                className="button button--success">
            <Icon name="plus-circle" /> Add new
          </Link>
        </h1>

        {!loading && loaded && (
          people ? (
            <PersonList people={people} admin />
          ) : (
            <p>No people</p>
          )
        )}

        {loading && <Loader />}

      </div>
      </main>
    );

  }

}
