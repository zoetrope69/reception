import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as settingActions from 'redux/modules/settingsCompanies';
import { load as loadSettings } from 'redux/modules/settingsCompanies';
import { initializeWithKey } from 'redux-form';
import { Icon, SettingCompanyForm } from 'components';

@connect(
  state => ({
    user: state.auth.user,
    settings: state.settingsCompanies.data,
    editing: state.settingsCompanies.editing,
    error: state.settingsCompanies.error,
  }),
  {...settingActions, initializeWithKey })
export default class AdminCompanySettings extends Component {
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

    const { editStop, settings, error, editing, params } = this.props;

    const setting = settings.find(settingsItem => settingsItem._id === params.company);

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

      <h1>Company Settings</h1>

      {error && (
      <div className="alert alert--danger" role="alert">
        {error}
      </div>
      )}

      {setting && (
        <SettingCompanyForm formKey={String(setting._id)} key={String(setting._id)} initialValues={setting} editing={!editing[setting._id]} />
      )}

    </div>
    </main>
    );
  }
}
