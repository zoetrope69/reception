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
        if (newPerson.visibility && personId === newPerson._id) {
          return newPerson;
        }
      }
    });

    console.log(company);

    return (
      <main className="page page--company">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front/companies">
            <Icon name="chevron-left" /> Back
          </Link>
          <p className="instruction">Company</p>
        </div>

        {!loading && loaded && (
        <div>

          <div style={{ overflow: 'hidden' }}>
            <h1 className="page--company__name">{company.name}</h1>
            {company.image && (
            <div className="page--company__logo">
              <img src={`${company.image}`} />
            </div>
            )}
          </div>

          {company.email && (
          <div className="page--company__email">
            <Icon name="envelope" /> {company.email}
          </div>
          )}

          {company.website && (
          <div className="page--company__website">
            <Icon name="earth" /> {company.website}
          </div>
          )}

          {people && people.length > 0 && (
          <div>
            <h2 className="page--company__members-title">Members of {company.name}</h2>
            <PersonList people={people} />
          </div>
          )}
        </div>
        )}

        {loading && <Loader />}

      </div>
      </main>
    );
  }

}
