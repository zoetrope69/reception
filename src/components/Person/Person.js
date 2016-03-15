import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class Person extends Component {
  static propTypes = {
    admin: PropTypes.bool,
    person: PropTypes.object.isRequired,
    preview: PropTypes.bool
  }

  render() {
    const { admin, person, preview } = this.props;

    let companyNode;
    let labelNode;

    if (person && typeof person.company !== 'undefined') {
      companyNode = (
        <div className="person__company">
            <div className="person__position">
              {person.company.title !== '' && typeof person.company.title !== 'undefined' ? person.company.title + ' at ' : false}
              <span to={`/front/company/${person.company.name}`} className="person__company-name">{person.company.name}</span>
            </div>
            {person.company.image && (
              <span to={`/front/company/${person.company.name}`} className="person__company-logo">
                <img src={`/images/company/${person.company.image}`} alt={`${person.company.name}'s logo`} />
              </span>
            )}
        </div>
      );
    }

    if (person.type === 'Staff') {
      labelNode = (<span className="label">Staff</span>);
    }

    const contentsNode = admin ? (
      <Link to={'/person/' + person._id} className="person person--admin">

        <span className="person__image">
          <img src={person.image ? person.image : '/default-person.png'}
                alt={`Picture of ${person.firstName} ${person.lastName}`} />
        </span>

        <span className="person__details">

          <span className="person__name">
            {person.firstName} {person.lastName} {labelNode}
          </span>

          <span className="person__labels">
            {!person.visibility && (
              <span className="person__label person__label--hidden">
                <Icon name="eye" /> Hidden
              </span>
            )}
            {person.invited && (
              <span className="person__label person__label--invited">
                <Icon name="thumbs-up" /> Invited
              </span>
            )}
            {!person.invited && !person.registered && (
              <span className="person__label person__label--awaiting-invite">
                <Icon name="envelope" /> Awaiting invite
              </span>
            )}
          </span>

        </span>

      </Link>
      ) : (
      <Link to={`/front/person/${person._id}`} className="person">

        <div className="person__image">
          <img src={person.image ? person.image : '/images/person/default.png'}
                alt={`Picture of ${person.firstName} ${person.lastName}`} />
        </div>

        <div className="person__details">

          <div className="person__name">
            {person.firstName} {person.lastName} {labelNode}
          </div>

          {companyNode}

          <div className="person__right-arrow">
            <Icon name="chevron-right" large />
          </div>

        </div>

      </Link>
      );

    return (
      <div className={preview && 'person'}>{contentsNode}</div>
    );
  }

}
