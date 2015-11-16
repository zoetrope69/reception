import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, CompanyList } from 'components';
import { load as loadCompanies } from 'redux/modules/companies';

@connect(state => ({
  companies: state.companies.data
}))
export default class AdminCompanies extends Component {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadCompanies());
  }

  render() {

    const { companies } = this.props;

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
