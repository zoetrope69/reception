import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class Person extends Component {
  static propTypes = {
    person: PropTypes.object.isRequired,
    preview: PropTypes.bool
  }

  notifyPerson() {
    // do something here
  }

  render() {

    const { preview, person } = this.props;

    let companyNode;
    let image = 'default.png';
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

    // if they have a image
    if (typeof person.image !== 'undefined') {
      image = person.image;
    }

    if (person.type === 'staff') {
      labelNode = (<span className="label">Staff</span>);
    }

    const contentsNode = (
    <div>
      <div className="person__image">
        <img src={`/images/person/${image}`} alt={`Picture of ${person.firstName} ${person.lastName}`} />
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

    </div>
    );

    return (
      preview ? (
        <div className="person">
          {contentsNode}
        </div>
      ) : (
        <Link to={`/front/people/${person._id}`} className="person">
          {contentsNode}
        </Link>
      )
    );
  }

}
