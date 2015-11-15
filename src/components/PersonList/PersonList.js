import React, { Component, PropTypes } from 'react';
import { AdminPerson, Person } from 'components';

export default class PersonList extends Component {
  static propTypes = {
    admin: PropTypes.bool,
    people: PropTypes.array.isRequired
  }

  render() {
    const { admin, people } = this.props;

    // if there is no people
    if (people.length <= 0) {
      return (<p>No people</p>);
    }

    // sort by alphabetical
    people.sort((aItem, bItem) => {
      if (aItem.name.first < bItem.name.first) return -1;
      if (aItem.name.first > bItem.name.first) return 1;
      return 0;
    });

    return (
      <ul className="personList">
      {people.map(person => {
        if (JSON.parse(person.visibility)) {
          return (admin ? (
              <AdminPerson person={person} key={person.email[0].address} />
            ) : (
              <Person person={person} key={person.email[0].address} />
            )
          );
        }
      })}
      </ul>
    );

  }

}