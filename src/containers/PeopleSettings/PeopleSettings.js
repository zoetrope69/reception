import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as peopleActions from 'redux/modules/people';
import { load as loadPeople } from 'redux/modules/people';
import { initializeWithKey } from 'redux-form';
import { Icon, PeopleForm } from 'components';

@connect(
  state => ({
    editing: state.people.editing,
    error: state.people.error,
    people: state.people.data,
    user: state.auth.user
  }),
  {...peopleActions, initializeWithKey })
export default class PeopleSettings extends Component {
  static propTypes = {
    editing: PropTypes.object.isRequired,
    editStart: PropTypes.func.isRequired,
    editStop: PropTypes.func.isRequired,
    error: PropTypes.string,
    initializeWithKey: PropTypes.func.isRequired,
    params: PropTypes.object,
    people: PropTypes.array,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadPeople());
  }

  handleEdit(people) {
    const { editStart } = this.props; // eslint-disable-line no-shadow
    return () => {
      editStart(String(people._id));
    };
  }

  render() {

    const { editStop, user, people, error, editing, params } = this.props;
    const hasPersonParam = (params && typeof params.person !== 'undefined');

    let person = null;

    if (hasPersonParam) { // url param use that
      person = people.find(peopleItem => peopleItem._id === params.person);
    }else if (user && typeof user._id !== 'undefined') { // otherwise check the session
      person = people.find(peopleItem => peopleItem._id === user._id);
    }

    return (
      <main className="page page--people-settings">
      <div className="container">

      <DocumentMeta title="Settings" />

      {person && (

        editing[person._id] ? (
          <button key={'edit' + person._id}
                  style={{ float: 'right' }}
                  className="button"
                  onClick={() => editStop(person._id)}>
            <Icon name="trash" /> Cancel
          </button>
        ) : (
          <button key={'edit' + person._id}
                  style={{ float: 'right' }}
                  className="button"
                  onClick={::this.handleEdit(person)}>
            <Icon name="pencil" /> Edit
          </button>
        )

      )}

      <h1>{hasPersonParam ? `${person.firstName} ${person.lastName}'s` : 'Your'} Profile</h1>

      {error && (
      <div className="alert alert--danger" role="alert">
        {error}
      </div>
      )}

      {person && (
        <PeopleForm formKey={String(person._id)} key={String(person._id)} initialValues={person} editing={!editing[person._id]} />
      )}

    </div>
    </main>
    );
  }
}
