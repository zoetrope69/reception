import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import companyNewValidation, { locations } from './companyNewValidation';
import { Icon } from 'components';

@reduxForm({
  form: 'companyNew',
  fields: ['type', 'name', 'location', 'personFirstName', 'personLastName', 'personEmail'],
  validate: companyNewValidation
})
export default class CompanyNewForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    companies: PropTypes.array,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    user: PropTypes.object
  }

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  render() {
    const { fields: { name, location, personFirstName, personLastName, personEmail }, handleSubmit, resetForm } = this.props;

    const renderInput = (field, label) =>
      <div className={'input-wrapper' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name}>{label}</label>
        <input type="text" id={field.name} {...field}/>
        {field.error && field.touched && this.renderHelpText(field.error)}
      </div>;

    return (
      <form onSubmit={handleSubmit}>

        <h3 className="input-header">Company</h3>

        <div className={'input-wrapper' + (location.error && location.touched ? ' has-error' : '')}>
          <label htmlFor="location">Location</label>
          <select name="location" {...location}>
            <option value="none">Pick a location...</option>
            {locations.map((locationItem, key) => <option value={locationItem._id} key={locationItem._id + '_' + key}>{locationItem}</option>)}
          </select>
          {location.error && location.touched && this.renderHelpText(location.error)}
        </div>

        {renderInput(name, 'Name')}

        <h3 className="input-header" style={{ paddingBottom: '.25em' }}>Main contact</h3>
        <p style={{ paddingBottom: '1em' }}>This person will look after the company.</p>

        {renderInput(personEmail, 'Email')}
        {renderInput(personFirstName, 'First Name')}
        {renderInput(personLastName, 'Last Name')}

        <div className="input-wrapper">
          <button className="button button--success" onClick={handleSubmit} style={{ float: 'right' }}>
            <Icon name="checkmark-circle"/> Submit
          </button>
          <button className="button button--warning" onClick={resetForm} style={{ marginRight: '.5em', float: 'right' }}>
            <Icon name="cross-circle" /> Reset
          </button>
        </div>

      </form>
    );
  }
}
