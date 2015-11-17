import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class Person extends Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  }

  render() {

    const { person } = this.props;
    let labelNode;

    if (person.type === 'staff') {
      labelNode = (<span className="label">Staff</span>);
    }

    return (
      <Link to={'/admin/people/' + person._id} className="person person--admin">
        <span className="person__image">
          <img src={'/images/person/default.png'} alt={'Picture of ' + person.firstName + ' ' + person.lastName} />
        </span>
        <span className="person__details">
          <span className="person__name">
            {person.firstName} {person.lastName} {labelNode}

            {!JSON.parse(person.visibility) && (
              <Icon name="eye" />
            )}
          </span>
        </span>
    </Link>
    );
  }

}
