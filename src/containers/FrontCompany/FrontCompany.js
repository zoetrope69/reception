import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, PersonList } from 'components';

@connect(state => ({ companies: state.companies.data }))
export default class FrontCompany extends Component {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    params: PropTypes.obj
  }

  render() {

    const { companies, params } = this.props;

    const company = companies.find(companyItem => companyItem._id === params.company);
    const people = company.people;

    return (
      <main className="page page--people">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front/companies">
            <Icon name="chevron-left" large /> Back
          </Link>
          <p className="instruction">Members</p>
        </div>

        <PersonList people={people} />

      </div>
      </main>
    );

  }

}
