import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Person } from 'components';

@connect(state => ({ people: state.people.data }))
export default class PersonList extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
    companyName: PropTypes.string
  }

  render() {
    const { companyName } = this.props;
    let { people } = this.props;

    // if a company name is set filter it to just those people
    if (companyName && companyName.length > 0) {
      people = people.filter(person => person.company.name === companyName);
    }

    // sort by alphabetical
    people.sort((aItem, bItem) => {
      if (aItem.name.first < bItem.name.first) return -1;
      if (aItem.name.first > bItem.name.first) return 1;
      return 0;
    });

    return (
      <ul className="personList">
      {people.map((person, key) => {
        if (JSON.parse(person.visibility)) {
          return (<Person person={person} key={key} />);
        }
      })}
      </ul>
    );

  }

}
