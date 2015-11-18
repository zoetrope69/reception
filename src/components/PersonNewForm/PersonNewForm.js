import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import personNewValidation from './personNewValidation';
import { Icon, Loader } from 'components';
import { connect } from 'react-redux';

@connect(
  state => ({
    companies: state.companies.data,
    error: state.companies.error,
    loaded: state.companies.loaded,
    loading: state.companies.loading,
    user: state.auth.user
  })
)
@reduxForm({
  form: 'personNew',
  fields: ['type', 'firstName', 'lastName', 'email', 'company'],
  validate: personNewValidation
})
export default class personNewForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    companies: PropTypes.array,
    dirty: PropTypes.bool.isRequired,
    error: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    pristine: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    user: PropTypes.object,
    valid: PropTypes.bool.isRequired
  }

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  }

  render() {

    const { companies, fields: { firstName, lastName, email, company }, handleSubmit, loaded, loading, resetForm, user } = this.props;

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
            {!loading && loaded && (
            <select name="company" {...company}>
              <option value="none">Pick a company...</option>
              {companies.map((companyItem, key) => <option value={companyItem._id} key={companyItem._id + '_' + key}>{companyItem.name}</option>)}
            </select>
            )}
            {loading && <Loader />}
            {company.error && company.touched && this.renderHelpText(company.error)}
          </div>
        )}

        {renderInput(email, 'Email')}
        {renderInput(firstName, 'First Name')}
        {renderInput(lastName, 'Last Name')}

        <div className="input-wrapper">
          <button className="button button--success" disabled={loading} onClick={handleSubmit} style={{ float: 'right' }}>
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
