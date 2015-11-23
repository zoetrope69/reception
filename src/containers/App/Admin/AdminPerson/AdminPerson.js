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
    generating: state.passwords.generating,
    loaded: state.people.loaded,
    loading: state.people.loading,
    people: state.people.data,
    sent: state.passwords.sentEmail,
    user: state.auth.user
  }),
  {...passwordActions, ...peopleActions, initializeWithKey })
export default class AdminPerson extends Component {
  static propTypes = {
    editing: PropTypes.object.isRequired,
    editStart: PropTypes.func.isRequired,
    editStop: PropTypes.func.isRequired,
    error: PropTypes.string,
    deletePeople: PropTypes.func,
    generatePasswordToken: PropTypes.func.isRequired,
    generating: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    params: PropTypes.object,
    people: PropTypes.array,
    sent: PropTypes.string,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadPeople());
  }

  handleInvite(person) {
    const { generatePasswordToken } = this.props; // eslint-disable-line no-shadow
    return () => {
      generatePasswordToken(person.email, true);
    };
  }

  handleEdit(person) {
    const { editStart } = this.props; // eslint-disable-line no-shadow
    return () => {
      editStart(String(person._id));
    };
  }

  render() {

    const { editing, editStop, error, generating, loaded, loading, params, people, sent, user } = this.props;

    let person = null;
    let profile = null;
    const param = (params && typeof params.person !== 'undefined');

    if (param) { // url param use that
      person = people.find(peopleItem => peopleItem._id === params.person);
    }else if (user && typeof user._id !== 'undefined') { // otherwise check the session
      person = people.find(peopleItem => peopleItem._id === user._id);
      profile = true;
    }

    return (
    <div>

      <div className="page-title">
      <div className="container">

        <DocumentMeta title={(param ? 'Edit Person' : 'Profile') + ' | Innovation Space Reception App'} />

        <h1><Icon name="user" /> {param ? 'Edit Person' : 'Profile'}</h1>

          <div className="buttons">
            {!loading && loaded && person && (
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
          </div>

      </div>
      </div>

      {error && <Alert message={error} />}

      {!profile && !loading && loaded && !sent && !person.invited && !person.registered && (
      <div className="alert alert--info">
      <div className="container">

        <Icon name="smile"/> This person hasn't been invited yet!

        <button key={'invite' + person._id}
                className="button"
                onClick={::this.handleInvite(person)}
                disabled={sent || generating}>
          <Icon name={(generating) ? 'sync' : 'envelope'} spin={generating} />{' '}
          {(generating ? 'Sending email to ' : 'Email invite to ') + person.email}
        </button>

      </div>
    </div>
      )}

      {!profile && !loading && loaded && (sent === person.email) && !person.invited && (
      <div className="alert alert--success">
      <div className="container">

        <Icon name="thumbs-up" /> They've been invited!

      </div>
      </div>
      )}

      {!profile && !loading && loaded && (sent === person.email) && person.invited && (
      <div className="alert alert--success">
      <div className="container">

        <Icon name="thumbs-up" /> They've been invited again!

      </div>
      </div>
      )}

      {!profile && !loading && loaded && !sent && person.invited && (
      <div className="alert alert--info">
      <div className="container">

        <Icon name="thumbs-up" /> They've been invited!

        <button key={'invite' + person._id}
                className="button"
                onClick={::this.handleInvite(person)}
                disabled={sent || generating}>
          <Icon name={(generating) ? 'sync' : 'envelope'} spin={generating} />{' '}
          {(generating ? 'Sending email to ' : 'Send another email invite to ') + person.email}
        </button>

      </div>
      </div>
      )}

      <main className="page page--person">
      <div className="container">

      {!loading && loaded && (
        person ? (
          <PersonForm formKey={String(person._id)} key={String(person._id)} initialValues={person} editing={!editing[person._id]} profile={profile} />
        ) : (
          <p>No person</p>
        )
      )}

      {loading && <Loader />}

      </div>
      </main>

    </div>
    );
  }
}
