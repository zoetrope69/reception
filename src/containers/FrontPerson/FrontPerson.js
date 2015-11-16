import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon } from 'components';

@connect(state => ({ people: state.people.data }))
export default class FrontPeople extends Component {
  static propTypes = {
    people: PropTypes.object.isRequired,
    params: PropTypes.object
  }

  render() {

    const { people, params } = this.props;
    const person = people.find(personItem => personItem.email === params.person);

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
      <main className="page page--person">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front/people">
            <Icon name="chevron-left" large /> Back
          </Link>
          <p className="instruction">Person</p>
        </div>

        <div className="person person--page">

          <div className="person__image">
            <img src={`/images/person/${image}`} alt={`Picture of ${person.firstName} ${person.lastName}`} />
          </div>

          <div className="person__details">

            <div className="person__name">
              {person.firstName} {person.lastName} {labelNode}
            </div>

            <div className="person__actions">

              { (person.notifcationSms || person.notifcationEmail) && (
              <div style={{ float: 'left', width: '100%' }}>
                <button className="button button--notify" onClick={this.notifyPerson}>
                  <Icon name="alarm" large /> Notify
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

          </div>

        </div>

      </div>
      </main>
    );

  }

}
