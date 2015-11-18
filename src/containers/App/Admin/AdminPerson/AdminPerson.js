import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as passwordActions from 'redux/modules/passwords';
import * as peopleActions from 'redux/modules/people';
import { load as loadPeople } from 'redux/modules/people';
import { initializeWithKey } from 'redux-form';
import { Alert, Icon, Loader, PersonForm } from 'components';

@connect(
  state => ({
    editing: state.people.editing,
    error: state.people.error,
    loaded: state.people.loaded,
    loading: state.people.loading,
    people: state.people.data,
    user: state.auth.user
  }),
  {...passwordActions, ...peopleActions, initializeWithKey })
export default class AdminPerson extends Component {
  static propTypes = {
    editing: PropTypes.object.isRequired,
    editStart: PropTypes.func.isRequired,
    editStop: PropTypes.func.isRequired,
    error: PropTypes.string,
    generatePasswordToken: PropTypes.func,
    initializeWithKey: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    params: PropTypes.object,
    people: PropTypes.array,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadPeople());
  }

  handleEdit(person) {
    const { editStart } = this.props; // eslint-disable-line no-shadow
    return () => {
      editStart(String(person._id));
    };
  }

  render() {

    const { editing, error, loaded, loading, params, people, user } = this.props;

    let person = null;
    const param = (params && typeof params.person !== 'undefined');

    if (param) { // url param use that
      person = people.find(peopleItem => peopleItem._id === params.person);
    }else if (user && typeof user._id !== 'undefined') { // otherwise check the session
      person = people.find(peopleItem => peopleItem._id === user._id);
    }

    return (
      <main className="page page--person">
      <div className="container">

      <DocumentMeta title={param ? 'Edit Person' : 'Profile'} />

      {error && <Alert message={error} />}

      {!loading && loaded && person && (
        !editing[person._id] && (
          <button key={'edit' + person._id}
                  style={{ float: 'right' }}
                  className="button"
                  onClick={::this.handleEdit(person)}>
            <Icon name="pencil" /> Edit
          </button>
        )
      )}

      <h1 style={{ color: '#E64B1D' }}>{param ? 'Edit Person' : 'Profile'}</h1>

      {!loading && loaded && (
        person ? (
          <PersonForm formKey={String(person._id)} key={String(person._id)} initialValues={person} editing={!editing[person._id]} />
        ) : (
          <p>No person</p>
        )
      )}

      {loading && <Loader />}

    </div>
    </main>
    );
  }
}
