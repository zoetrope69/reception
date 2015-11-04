import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AdminPerson, Person } from 'components';


@connect(
  state => ({
    user: state.auth.user,
    people: state.people.data
  }))
export default class PersonList extends Component {
  static propTypes = {
    user: PropTypes.object,
    people: PropTypes.array.isRequired,
    companyName: PropTypes.string,
    admin: PropTypes.bool
  }

  render() {
    const { admin, companyName, user } = this.props;
    let { people } = this.props;

    // if a company name is set filter it to just those people
    if (companyName && companyName.length > 0) {
      people = people.filter(person => person.company.name === companyName);
    }

    if (user && typeof user.username !== 'undefined' && admin) {
      // if admin page remove individual from people page
      people = people.filter(person => person.email !== user.username);
    }

    // sort by alphabetical
    people.sort((aItem, bItem) => {
      if (aItem.firstName < bItem.firstName) return -1;
      if (aItem.firstName > bItem.firstName) return 1;
      return 0;
    });

    return (
      <ul className="personList">
      {people.map((person, key) => {
        if (JSON.parse(person.visibility)) {
          return (admin ? (
              <AdminPerson person={person} key={key} />
            ) : (
              <Person person={person} key={key} />
            )
          );
        }
      })}
      </ul>
    );

  }

}
