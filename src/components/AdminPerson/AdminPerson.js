import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class Person extends Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  }

  notifyPerson() {
    // do something here
  }

  render() {

    const { person } = this.props;

    let image = 'default.png';
    let labelNode;

    // if they have a image
    if (typeof person.image !== 'undefined') {
      image = person.image;
    }

    if (person.type === 'staff') {
      labelNode = (<span className="label">Staff</span>);
    }

    return (
      <Link to={'/admin/people/' + person._id} className="person person--admin">
        <span className="person__image">
          <img src={'/images/person/' + image} alt={'Picture of ' + person.firstName + ' ' + person.lastName} />
        </span>
        <span className="person__details">
          <span className="person__name">
            {person.firstName} {person.lastName} {labelNode}

            {!JSON.parse(person.visibility) && (
              <Icon name="eye" />
            )}
          </span>
          {typeof person.company !== 'undefined' && (
          <span className="person__position">
          {person.company.title !== '' && typeof person.company.title !== 'undefined' ? person.company.title + ' at ' : false}
          {typeof person.company.name !== 'undefined' && (
            <span className="person__company-name">{person.company.name}</span>
          )}
          </span>
          )}
        </span>
    </Link>
    );
  }

}
