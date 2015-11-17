import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon } from 'components';
import { pushState } from 'redux-router';
import * as notificationActions from 'redux/modules/notifications';

@connect(
  state => ({
    error: state.notifications.error,
    notified: state.notifications.notified,
    notifying: state.notifications.notifying,
    people: state.people.data,
  }),
  {...notificationActions, pushState})
export default class FrontPeople extends Component {
  static propTypes = {
    error: PropTypes.string,
    notified: PropTypes.bool,
    notify: PropTypes.func,
    notifying: PropTypes.bool,
    params: PropTypes.object,
    people: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired
  }

  handleNotification(person) {
    const { notify } = this.props;
    return () => {
      notify(person); // notify the person
      this.props.pushState(null, '/front/instruction/reception'); // redirect them back to the thank you message
    };
  }

  render() {

    const { notifying, people, params } = this.props;
    console.log(people);
    console.log(params);
    const person = people.find(personItem => personItem._id === params.person);
    console.log(person);

    let image = 'default.png';
    let labelNode;

    if (person.image) {
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

              { (person.notificationSms || person.notificationEmail) && (
              <div style={{ float: 'left', width: '100%' }}>
                <button className="button button--notify" disabled={notifying} onClick={::this.handleNotification(person)}>
                  <Icon name={(notifying) ? 'sync' : 'alarm'} spin={notifying} large /> {(notifying) ? 'Notifying...' : 'Notify'}
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
