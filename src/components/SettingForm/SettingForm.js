import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import settingValidation, { types } from './settingValidation';
import * as settingActions from 'redux/modules/settings';
import { Icon } from 'components';

@connect(
  state => ({
    user: state.auth.user,
    saveError: state.settings.saveError
  }),
  dispatch => bindActionCreators(settingActions, dispatch)
)
@reduxForm({
  form: 'setting',
  fields: ['_id', '_rev', 'visibility', 'type', 'firstName',
           'lastName', 'email', 'phone', 'notificationSms', 'notificationEmail' ],
  validate: settingValidation
})
export default class SettingForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    editing: PropTypes.bool,
    user: PropTypes.object
  };

  renderHelpText(message) {
    return (
      <span className={`help-block ${ message.length > 0 ? '' : 'help-block--hidden' }`}>{message}</span>
    );
  }

  render() {
    const { editing, editStop, fields: {_id, _rev, visibility, type, firstName, lastName, email, phone, notificationSms, notificationEmail }, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values, user } = this.props;

    return (
      <div className={submitting ? 'saving' : ''}>

        <input type="hidden" value={_id} />
        <input type="hidden" value={_rev} />

        <div className={'input-wrapper' + (visibility.error ? ' has-error' : '')}>
          <label htmlFor="visibility">Visibility</label>
          <label htmlFor="visibility" className="control checkbox">
            <input id="visibility" name="visibility" type="checkbox" {...visibility} disabled={editing} />
            <span className="control-indicator"></span>
            <Icon name="eye" /> Public
          </label>
          {visibility.error && visibility.touched && this.renderHelpText(visibility.error)}
        </div>

        {user.role === 'admin' && (
        <div className={'input-wrapper' + (type.error ? ' has-error' : '')}>
          <label htmlFor="type">Type</label>
          <select name="type" {...type} disabled={editing} >
            {types.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
          </select>
          {type.error && type.touched && this.renderHelpText(type.error)}
        </div>
        )}

        <div className={'input-wrapper' + (email.error ? ' has-error' : '')}>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" placeholder="jane.smith@example.com" disabled {...email} />
          {email.error && email.touched && this.renderHelpText(email.error)}
        </div>

        <div className={'input-wrapper' + (firstName.error ? ' has-error' : '')}>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" placeholder="Jane" disabled={editing} {...firstName} />
          {firstName.error && firstName.touched && this.renderHelpText(firstName.error)}
        </div>

        <div className={'input-wrapper' + (lastName.error ? ' has-error' : '')}>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" placeholder="Smith" disabled={editing} {...lastName} />
          {lastName.error && lastName.touched && this.renderHelpText(lastName.error)}
        </div>

        <div className={'input-wrapper' + (phone.error ? ' has-error' : '')}>
          <label htmlFor="phone">Phone</label>
          <input name="phone" type="text" placeholder="0123456789" disabled={editing} {...phone} />
          {phone.error && phone.touched && this.renderHelpText(phone.error)}
        </div>

        {(_id.value === user._id) && (
        <div>

          <h3 className="input-header">Notifications</h3>

          <div className="input-notifications">

              <div className={'input-wrapper input-wrapper--control' + (notificationSms.error ? ' has-error' : '')}>
                  <label htmlFor="notify-sms" className="control checkbox">
                      <input id="notify-sms" name="notify-sms" type="checkbox" {...notificationSms} disabled={editing} />
                      <span className="control-indicator"></span>
                      <Icon name="bubble" /> SMS
                  </label>
                  {notificationSms.error && notificationSms.touched && this.renderHelpText(notificationSms.error)}
              </div>

              <div className={'input-wrapper input-wrapper--control' + (notificationEmail.error ? ' has-error' : '')}>
                  <label htmlFor="notify-email" className="control checkbox">
                      <input id="notify-email" name="notify-email" type="checkbox" {...notificationEmail} disabled={editing} />
                      <span className="control-indicator"></span>
                      <Icon name="envelope" /> Email
                  </label>
                  {notificationEmail.error && notificationEmail.touched && this.renderHelpText(notificationEmail.error)}
              </div>

          </div>

        </div>
        )}

        <div className="input-wrapper">

          <button style={{ float: 'right' }}
                  className="button button--success"
                  onClick={handleSubmit(() => save(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={editing || pristine || invalid || submitting}>
            <Icon name={submitting ? 'cloud-upload' : 'cloud-check'} /> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}

          <button style={{ marginRight: '1em', float: 'right' }}
                  className="button button--warning"
                  onClick={() => editStop(formKey)}
                  disabled={editing || submitting}>
            <Icon name="trash" /> Cancel
          </button>

        </div>

      </div>
    );
  }
}
