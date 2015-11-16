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
  fields: ['_id', '_rev', 'visibility', 'name', 'location', 'website', 'email'],
  validate: companyValidation
})
export default class CompanyForm extends Component {
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
    editing: PropTypes.bool
  };

  renderHelpText(message) {
    return (
      <span className={`help-block ${ message.length > 0 ? '' : 'help-block--hidden' }`}>{message}</span>
    );
  }

  render() {
    const { editing, editStop, fields: {_id, _rev, visibility, name, location, website, email }, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;

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

        <div className={'input-wrapper' + (location.error ? ' has-error' : '')}>
          <label htmlFor="location">Location</label>
          <select name="location" {...location} disabled={editing} >
            {locations.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
          </select>
          {location.error && location.touched && this.renderHelpText(location.error)}
        </div>

        <div className={'input-wrapper' + (name.error ? ' has-error' : '')}>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" placeholder="Jane" disabled={editing} {...name} />
          {name.error && name.touched && this.renderHelpText(name.error)}
        </div>

        <div className={'input-wrapper' + (website.error ? ' has-error' : '')}>
          <label htmlFor="website">Website</label>
          <input name="website" type="text" placeholder="http://example.com" disabled={editing} {...website} />
          {website.error && website.touched && this.renderHelpText(website.error)}
        </div>

        <div className={'input-wrapper' + (email.error ? ' has-error' : '')}>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" placeholder="hello@example.com" disabled={editing} {...email} />
          {email.error && email.touched && this.renderHelpText(email.error)}
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
