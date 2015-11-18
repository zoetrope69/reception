import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, Loader, PersonList } from 'components';

@connect(state => ({
  companies: state.front.companies,
  loaded: state.front.loaded,
  loading: state.front.loading,
  people: state.front.people
}))
export default class FrontCompany extends Component {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    params: PropTypes.object,
    people: PropTypes.array.isRequired
  }

  render() {

    const { companies, loaded, loading, params } = this.props;
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

        {!loading && loaded && (
          people ? (
            <PersonList people={people} />
          ) : (
            <p>No people</p>
          )
        )}

        {loading && <Loader />}

      </div>
      </main>
    );

  }

}
