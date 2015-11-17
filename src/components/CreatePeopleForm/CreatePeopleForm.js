import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import createPeopleValidation from './createPeopleValidation';
import { Icon } from 'components';
import { connect } from 'react-redux';

@connect(
  state => ({
    user: state.auth.user,
    companies: state.companies.data
  })
)
@reduxForm({
  form: 'createPeople',
  fields: ['type', 'firstName', 'lastName', 'email', 'company'],
  validate: createPeopleValidation
})
export default class CreatePeopleForm extends Component {
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
      <span className={`help-block ${ message.length > 0 ? '' : 'help-block--hidden' }`}>{message}</span>
    );
  }

  render() {

    const { companies, fields: { firstName, lastName, email, company }, handleSubmit, resetForm, user } = this.props;

    console.log(companies);
    console.log(user);

    const renderInput = (field, label) =>
      <div className={'input-wrapper' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name}>{label}</label>
        <input type="text" id={field.name} {...field}/>
        {field.error && field.touched && this.renderHelpText(field.error)}
      </div>;

    return (
      <form onSubmit={handleSubmit}>

        {user.role === 'admin' && (
          <div className={'input-wrapper' + (company.error && company.touched ? ' has-error' : '')}>
            <label htmlFor="company">Company</label>
            <select name="company" {...company}>
              <option value="none">Pick a company...</option>
              {companies.map(companyItem => <option value={companyItem._id} key={companyItem._id}>{companyItem.name}</option>)}
            </select>
            {company.error && company.touched && this.renderHelpText(company.error)}
          </div>
        )}

        {renderInput(email, 'Email')}
        {renderInput(firstName, 'First Name')}
        {renderInput(lastName, 'Last Name')}

        <div className="input-wrapper">
          <button className="button button--success" onClick={handleSubmit} style={{ float: 'right' }}>
            <Icon name="thumbs-up"/> Submit
          </button>
          <button className="button button--warning" onClick={resetForm} style={{ float: 'right' }}>
            <Icon name="cross" /> Reset
          </button>
        </div>

      </form>
    );
  }
}
