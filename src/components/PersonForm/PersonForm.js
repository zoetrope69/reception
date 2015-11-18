import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import personValidation, { types } from './personValidation';
import * as peopleActions from 'redux/modules/people';
import { Icon } from 'components';

@connect(
  state => ({
    user: state.auth.user,
    saveError: state.people.saveError
  }),
  dispatch => bindActionCreators(peopleActions, dispatch)
)
@reduxForm({
  form: 'person',
  fields: ['_id', '_rev', 'visibility', 'type', 'firstName',
           'lastName', 'email', 'phone', 'notificationSms', 'notificationEmail' ],
  validate: personValidation
})
export default class PersonForm extends Component {
  static propTypes = {
    editing: PropTypes.bool,
    editStop: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    formKey: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    profile: PropTypes.bool,
    save: PropTypes.func.isRequired,
    saveError: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
    user: PropTypes.object,
    values: PropTypes.object.isRequired
  };

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  render() {
    const { editing, editStop, fields: { _id, _rev, visibility, type, firstName, lastName, email, phone, notificationSms, notificationEmail }, formKey, handleSubmit, invalid,
      profile, pristine, save, submitting, saveError: { [formKey]: saveError }, user, values } = this.props;

    return (
      <div className={submitting ? 'saving' : ''}>

        {!editing && (
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
            <Icon name={submitting ? 'cloud-upload' : 'cloud-check'} /> {submitting ? 'Saving' : 'Save'}
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}

          <button style={{ marginRight: '1em', float: 'right' }}
                  className="button button--warning"
                  onClick={() => editStop(formKey)}
                  disabled={editing || submitting}>
            <Icon name="trash" /> Cancel
          </button>

        </div>
        )}

        <input type="hidden" value={_id} />
        <input type="hidden" value={_rev} />

        <div className={'input-wrapper' + (visibility.error && visibility.touched ? ' has-error' : '')}>
          <label htmlFor="visibility">Visibility</label>
          <label htmlFor="visibility" className="control checkbox">
            <input id="visibility" name="visibility" type="checkbox" disabled={editing} {...visibility} />
            <span className="control-indicator"></span>
            <Icon name="eye" /> Public
          </label>
          {visibility.error && visibility.touched && this.renderHelpText(visibility.error)}
        </div>

        {user.role === 'admin' && (
        <div className={'input-wrapper' + (type.error && type.touched ? ' has-error' : '')}>
          <label htmlFor="type">Type</label>
          <select name="type" {...type} disabled={editing} >
            {types.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
          </select>
          {type.error && type.touched && this.renderHelpText(type.error)}
        </div>
        )}

        <div className={'input-wrapper' + (email.error && email.touched ? ' has-error' : '')}>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" placeholder="jane.smith@example.com" disabled {...email} />
          {email.error && email.touched && this.renderHelpText(email.error)}
        </div>

        <div className={'input-wrapper' + (firstName.error && firstName.touched ? ' has-error' : '')}>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" placeholder="Jane" disabled={editing} {...firstName} />
          {firstName.error && firstName.touched && this.renderHelpText(firstName.error)}
        </div>

        <div className={'input-wrapper' + (lastName.error && lastName.touched ? ' has-error' : '')}>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" placeholder="Smith" disabled={editing} {...lastName} />
          {lastName.error && lastName.touched && this.renderHelpText(lastName.error)}
        </div>

        <div className={'input-wrapper' + (phone.error && phone.touched ? ' has-error' : '')}>
          <label htmlFor="phone">Phone</label>
          <input name="phone" type="text" placeholder="0123456789" disabled={editing} {...phone} />
          {phone.error && phone.touched && this.renderHelpText(phone.error)}
        </div>

        {/* check if this is the profile page */}
        {profile && (
        <div>

          <h3 className="input-header">Notifications</h3>

          <div className="input-notifications">


              <div className={'input-wrapper input-wrapper--control' + (notificationSms.error && notificationSms.touched ? ' has-error' : '')}>
                  <label htmlFor="notify-sms" className="control checkbox">
                      <input type="checkbox" id="notify-sms" disabled={editing} {...notificationSms} />
                      <span className="control-indicator"></span>
                      <Icon name="bubble" /> SMS
                  </label>
                  {notificationSms.error && notificationSms.touched && this.renderHelpText(notificationSms.error)}
              </div>

              <div className={'input-wrapper input-wrapper--control' + (notificationEmail.error && notificationEmail.touched ? ' has-error' : '')}>
                  <label htmlFor="notify-email" className="control checkbox">
                      <input id="notify-email" name="notify-email" type="checkbox" disabled={editing} {...notificationEmail} />
                      <span className="control-indicator"></span>
                      <Icon name="envelope" /> Email
                  </label>
                  {notificationEmail.error && notificationEmail.touched && this.renderHelpText(notificationEmail.error)}
              </div>

          </div>

        </div>
        )}

      </div>
    );
  }
}
