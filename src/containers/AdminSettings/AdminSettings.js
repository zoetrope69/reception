import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import * as settingActions from 'redux/modules/settings';
import { isLoaded, load as loadSettings } from 'redux/modules/settings';
import { initializeWithKey } from 'redux-form';
import { Icon, SettingForm } from 'components';

@connect(
  state => ({
    settings: state.settings.data,
    editing: state.settings.editing,
    error: state.settings.error,
    loading: state.settings.loading
  }),
  {...settingActions, initializeWithKey })
export default class AdminSettings extends Component {
  static propTypes = {
    settings: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!isLoaded(getState())) {
      return dispatch(loadSettings());
    }
  }

  handleEdit(setting) {
    const {editStart} = this.props; // eslint-disable-line no-shadow
    return () => {
      editStart(String(setting.id));
    };
  }

  render() {

    const { settings, error, editing, loading, load } = this.props;

    const setting = settings[0];

    return (
      <main className="page page--settings">
      <div className="container">

      <DocumentMeta title="Settings" />

      <h1>Settings</h1>

      <button className="button button--success" onClick={load}>
        <Icon name={loading ? 'cog' : 'user'} /> Reload Settings
      </button>

      {setting && !editing[setting.id] && (
        <button key={setting.id} className="button" onClick={::this.handleEdit(setting)}>
          <Icon name="pencil" /> Edit
        </button>
      )}

      {error && (
      <div className="alert alert--danger" role="alert">
        {error}
      </div>
      )}

      {setting && editing[setting.id] && (
        <SettingForm formKey={String(setting.id)} key={String(setting.id)} initialValues={setting}/>
      )}

    </div>
    </main>
    );
  }
}
