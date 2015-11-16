import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, CompanyList } from 'components';
import * as settingCompanyActions from 'redux/modules/settingsCompanies';
import { load as loadSettingsCompany } from 'redux/modules/settingsCompanies';

@connect(
  state => ({
    companies: state.settingsCompanies.data
  }),
  {...settingCompanyActions })
export default class AdminCompanies extends Component {
  static propTypes = {
    companies: PropTypes.array.isRequired
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadSettingsCompany());
  }

  render() {

    const { companies } = this.props;

    console.log(companies);

    return (
      <main className="page page--companies">
      <div className="container">

        <button style={{ float: 'right' }}
                className="button button--success">
          <Icon name="plus-circle" /> Add new
        </button>

        <h1>Companies</h1>

        <CompanyList companies={companies} admin />

      </div>
      </main>
    );

  }

}
