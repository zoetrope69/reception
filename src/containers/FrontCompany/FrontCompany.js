import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, PersonList } from 'components';

@connect(state => ({
  people: state.people.data,
  companies: state.companies.data
}))
export default class FrontCompany extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    params: PropTypes.object
  }

  render() {

    const { companies, params } = this.props;
    let { people } = this.props;

    const company = companies.find(companiesItem => companiesItem._id === params.company);

    people = people.filter(newPerson => {
      for (let count = 0; count < company.people.length; count++) {
        const personId = company.people[count];
        if (personId === newPerson._id) {
          return newPerson;
        }
      }
    });


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
