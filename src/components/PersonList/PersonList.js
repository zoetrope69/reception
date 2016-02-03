import React, { Component, PropTypes } from 'react';
import { Person } from 'components';

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
      if (aItem.firstName < bItem.firstName) return -1;
      if (aItem.firstName > bItem.firstName) return 1;
      return 0;
    });

    return (
      <ul className="personList">
      {people.map((person, key) => {
        return (admin ? (
          <Person person={person} key={person._id + key} admin />
        ) : (
          JSON.parse(person.visibility) && (
            <Person person={person} key={person._id + key} />
          )
        ));
      })}
      </ul>
    );
  }

}
