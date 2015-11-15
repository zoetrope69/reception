import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as settingActions from 'redux/modules/settings';
import { load as loadSettings } from 'redux/modules/settings';
import { initializeWithKey } from 'redux-form';
import { Icon, SettingForm } from 'components';

@connect(
  state => ({
    user: state.auth.user,
    settings: state.settings.data,
    editing: state.settings.editing,
    error: state.settings.error,
  }),
  {...settingActions, initializeWithKey })
export default class AdminSettings extends Component {
  static propTypes = {
    settings: PropTypes.array,
    editStop: PropTypes.func.isRequired,
    error: PropTypes.string,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    editStart: PropTypes.func.isRequired,
    params: PropTypes.object,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadSettings());
  }

  handleEdit(setting) {
    const { editStart } = this.props; // eslint-disable-line no-shadow
    return () => {
      editStart(String(setting._id));
    };
  }

  render() {

    const { editStop, user, settings, error, editing, params } = this.props;

    let setting = null;

    if (params && typeof params.personId !== 'undefined') { // url param use that
      setting = settings.find(settingsItem => settingsItem._id === params.personId);
    }else if (user && typeof user.username !== 'undefined') { // otherwise check the session
      setting = settings.find(settingsItem => settingsItem.email[0].address === user.username);
    }

    return (
      <main className="page page--settings">
      <div className="container">

      <DocumentMeta title="Settings" />

      {setting && (

        editing[setting._id] ? (
          <button key={'edit' + setting._id}
                  style={{ float: 'right' }}
                  className="button"
                  onClick={() => editStop(setting._id)}>
            <Icon name="trash" /> Cancel
          </button>
        ) : (
          <button key={'edit' + setting._id}
                  style={{ float: 'right' }}
                  className="button"
                  onClick={::this.handleEdit(setting)}>
            <Icon name="pencil" /> Edit
          </button>
        )

      )}

      <h1>Settings</h1>

      {error && (
      <div className="alert alert--danger" role="alert">
        {error}
      </div>
      )}

      {setting && (
        <SettingForm formKey={String(setting._id)} key={String(setting._id)} initialValues={setting} editing={!editing[setting._id]} />
      )}

    </div>
    </main>
    );
  }
}