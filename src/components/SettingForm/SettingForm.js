import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import settingValidation, { types } from './settingValidation';
import * as settingActions from 'redux/modules/settings';
import { Icon } from 'components';

@connect(
  state => ({
    saveError: state.settings.saveError
  }),
  dispatch => bindActionCreators(settingActions, dispatch)
)
@reduxForm({
  form: 'setting',
  fields: ['id', 'visibility', 'type', 'firstName', 'lastName', 'email', 'phone'],
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
    values: PropTypes.object.isRequired
  };

  renderHelpText(message) {
    return (
      <span className={`help-block ${ message.length > 0 ? '' : 'help-block--hidden' }`}>{message}</span>
    );
  }

  render() {
    const { editStop, fields: { id, visibility, type, firstName, lastName, email, phone }, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;

    return (
      <div className={submitting ? 'saving' : ''}>

        {id.value}

        <div className={'input-wrapper' + (visibility.error ? ' has-error' : '')}>
          <label htmlFor="visibility">Visibility</label>
          <label htmlFor="visibility" className="control checkbox">
            <input id="visibility" name="visibility" type="checkbox" {...visibility} />
            <span className="control-indicator"></span>
            <Icon name="eye" /> Public
          </label>
          {visibility.error && visibility.touched && this.renderHelpText(visibility.error)}
        </div>

        {/*

          <div className="input-wrapper">

            <label htmlFor="photo">Photo</label>

            <div className="photo-upload">

              <div className="photo">
                <img src={image} alt="Profile image" />
              </div>

              {file ? (
              <div>
                <button className="button button--small button--photo-cancel" type="button">
                  <Icon name="cross-circle" large /> Cancel
                </button>
                <button className="button button--small button--success button--photo-upload" type="button">
                  <svg className="icon icon--file-add"><use xlinkHref="#lnr-file-add"></use></svg> Upload image
                </button>
              </div>
              ) : (
                <label className="button button--small button--photo-pick" htmlFor="photo">
                  <Icon name="file-empty" /> Pick image
                </label>
              )}

              <input className="file-upload" id="photo" type="file" accept="image/*;capture=camera"/>

            </div>

          </div>

        */}

        <div className={'input-wrapper' + (type.error ? ' has-error' : '')}>
          <label htmlFor="type">Type</label>
          <select name="type" {...type}>
            {types.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
          </select>
          {type.error && type.touched && this.renderHelpText(type.error)}
        </div>

        <div className={'input-wrapper' + (firstName.error ? ' has-error' : '')}>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" placeholder="Jane" {...firstName} />
          {firstName.error && firstName.touched && this.renderHelpText(firstName.error)}
        </div>

        <div className={'input-wrapper' + (lastName.error ? ' has-error' : '')}>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" placeholder="Smith" {...lastName} />
          {lastName.error && lastName.touched && this.renderHelpText(lastName.error)}
        </div>

        <div className={'input-wrapper' + (email.error ? ' has-error' : '')}>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" placeholder="jane.smith@example.com" {...email} />
          {email.error && email.touched && this.renderHelpText(email.error)}
        </div>

        <div className={'input-wrapper' + (phone.error ? ' has-error' : '')}>
          <label htmlFor="phone">Phone</label>
          <input name="phone" type="text" placeholder="0123456789" {...phone} />
          {phone.error && phone.touched && this.renderHelpText(phone.error)}
        </div>

        {/*

        <h3 className="input-header">Notifications</h3>

        <div className="input-notifications">

            <div className="input-wrapper input-wrapper--control">
                <label htmlFor="notify-sms" className="control checkbox">
                    <input id="notify-sms" name="notify-sms" type="checkbox" checked={JSON.parse(person.notifications.sms)} onChange={this.handleChange} />
                    <span className="control-indicator"></span>
                    <Icon name="bubble" /> SMS <em style={{ 'float': 'right', 'fontSize': '.9em' }}>Texts to {person.phone}</em>
                </label>
            </div>

            <div className="input-wrapper input-wrapper--control">
                <label htmlFor="notify-email" className="control checkbox">
                    <input id="notify-email" name="notify-email" type="checkbox" checked={JSON.parse(person.notifications.email)} onChange={this.handleChange} />
                    <span className="control-indicator"></span>
                    <Icon name="envelope" /> Email <em style={{ 'float': 'right', 'fontSize': '.9em' }}>Emails to {person.email}</em>
                </label>
            </div>

        </div>

        <h3 className="input-header">Change password</h3>

        <div className="input-wrapper">
          <label htmlFor="password-old">Old password</label>
          <input
            ref="password-old"
            name="password-old"
            type="password"
            />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password-new">New password</label>
          <input
              ref="password-new"
              name="password-new"
              type="password"
              />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password-new-confirm">Confirm new password</label>
          <input
            ref="password-new-confirm"
            name="password-new-confirm"
            type="password"
            />
        </div>

        */}

        <div className="input-wrapper">

          <button className="button"
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <Icon name="cog" /> Cancel
          </button>

          <button className="button button--success"
                  onClick={handleSubmit(() => save(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={pristine || invalid || submitting}>
            <Icon name={submitting ? 'cog' : 'user'} /> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}

        </div>

      </div>
    );
  }
}
