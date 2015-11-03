import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class Person extends Component {
  static propTypes = {
    person: PropTypes.object.isRequired,
    personPage: PropTypes.bool
  }

  notifyPerson() {
    // do something here
  }

  render() {

    const { person, personPage } = this.props;

    let companyNode;
    let image = 'default.png';
    let labelNode;

    if (typeof person.company !== 'undefined') {

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

    // if they have a image
    if (typeof person.image !== 'undefined') {
      image = person.image;
    }

    if (person.type === 'staff') {
      labelNode = (<span className="label">Staff</span>);
    }

    return (
      <Link to={`/front/people/${person._id}`} className={`person ${ personPage ? 'person--page' : '' }`}>

        <div className="person__image">
          <img src={`/images/person/${image}`} alt={`Picture of ${person.name.first} ${person.name.last}`} />
        </div>

        <div className="person__details">

          <div className="person__name">
            {person.name.first} {person.name.last} {labelNode}
          </div>

          {companyNode}

          {!personPage && (
            <div className="person__right-arrow">
              <Icon name="chevron-right" large />
            </div>
          )}

        </div>

        {personPage && (
        <div className="person__actions">

          { (person.notifications.sms || person.notifications.email || person.notifications.phone) && (
          <div style={{ float: 'left', width: '100%' }}>
              <button className="button button--notify" onClick={this.notifyPerson}>
                  <svg className="icon icon--big icon--alarm"><use xlinkHref="#lnr-alarm"></use></svg> Notify
              </button>
              <span style={{ opacity: 0.75, display: 'block', textAlign: 'center' }}>This will notify them you're here</span>
          </div>
          )}

          {person.email && (
          <span className="person__email" href={`mailto:${person.email}`}>
            <Icon name="envelope" large /> {person.email}
          </span>
          )}

          {person.phone && (
          <span className="person__phone" href={`tel:${person.phone}`}>
            <Icon name="phone-handset" large /> {person.phone}
          </span>
          )}

        </div>
        )}

      </Link>
    );
  }

}
