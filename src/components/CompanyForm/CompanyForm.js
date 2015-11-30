import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import companyValidation, { locations } from './companyValidation';
import * as companiesActions from 'redux/modules/companies';
import { Icon } from 'components';

@connect(
  state => ({
    saveError: state.companies.saveError
  }),
  dispatch => bindActionCreators(companiesActions, dispatch)
)
@reduxForm({
  form: 'company',
  fields: ['_id', '_rev', 'visibility', 'location', 'name', 'email', 'website'],
  validate: companyValidation
})
export default class SettingCompanyForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    formKey: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    saveError: PropTypes.object,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired
  };

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  render() {
    const { fields: {_id, _rev, visibility, location, name, email, website }, formKey, handleSubmit, invalid,
      resetForm, pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;

    return (
      <div className={submitting ? 'saving' : ''}>

        <input type="hidden" value={_id} />
        <input type="hidden" value={_rev} />

        <div className={'input-wrapper' + (visibility.error && visibility.touched ? ' has-error' : '')}>
          <label htmlFor="visibility">Visibility</label>
          <label htmlFor="visibility" className="control checkbox">
            <input id="visibility" name="visibility" type="checkbox" {...visibility} />
            <span className="control-indicator"></span>
            <Icon name="eye" /> Public
          </label>
          {visibility.error && visibility.touched && this.renderHelpText(visibility.error)}
        </div>

        <div className={'input-wrapper' + (location.error && location.touched ? ' has-error' : '')}>
          <label htmlFor="location">Location</label>
          <select name="location" {...location} >
            {locations.map((locationItem, key) => <option value={locationItem} key={locationItem + '_' + key}>{locationItem}</option>)}
          </select>
          {location.error && location.touched && this.renderHelpText(location.error)}
        </div>

        <div className={'input-wrapper' + (name.error && name.touched ? ' has-error' : '')}>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" placeholder="Coca-Cola" {...name} />
          {name.error && name.touched && this.renderHelpText(name.error)}
        </div>

        <div className={'input-wrapper' + (email.error && email.touched ? ' has-error' : '')}>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" placeholder="hello@example.com" {...email} />
          {email.error && email.touched && this.renderHelpText(email.error)}
        </div>

        <div className={'input-wrapper' + (website.error && website.touched ? ' has-error' : '')}>
          <label htmlFor="website">Website</label>
          <input name="website" type="text" placeholder="0123456789" {...website} />
          {website.error && website.touched && this.renderHelpText(website.error)}
        </div>

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
                  disabled={pristine || invalid || submitting}>
            <Icon name={submitting ? 'sync' : 'checkmark-circle'} spin={submitting} /> {submitting ? 'Saving' : 'Save'}
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}

          <button style={{ marginRight: '1em', float: 'right' }}
                  className="button button--warning"
                  onClick={resetForm}
                  disabled={pristine || submitting}>
            <Icon name="cross-circle" /> Cancel
          </button>

        </div>

      </div>
    );
  }
}
