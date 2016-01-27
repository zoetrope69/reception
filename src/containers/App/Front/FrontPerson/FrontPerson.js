import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Loader } from 'components';
import { pushState } from 'redux-router';
import * as notificationActions from 'redux/modules/notifications';

@connect(
  state => ({
    error: state.notifications.error,
    loaded: state.front.loaded,
    loading: state.front.loading,
    notified: state.notifications.notified,
    notifying: state.notifications.notifying,
    people: state.front.people
  }),
  {...notificationActions, pushState})
export default class FrontPeople extends Component {
  static propTypes = {
    error: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    notified: PropTypes.bool,
    notify: PropTypes.func,
    notifying: PropTypes.bool,
    params: PropTypes.object,
    people: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { notified } = nextProps;
    if (notified) {
      this.props.pushState(null, '/front/reception'); // redirect them back to the thank you message
    }
  }

  handleNotification(person) {
    const { notify } = this.props;
    return () => {
      notify(person); // notify the person
    };
  }

  render() {

    const { error, loaded, loading, notifying, people, params } = this.props;
    const person = people.find(personItem => personItem._id === params.person);

    let labelNode;

    if (person.type === 'Staff') {
      labelNode = (<span className="label">Staff</span>);
    }

    return (
      <main className="page page--person">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front/people">
            <Icon name="chevron-left" /> Back
          </Link>
          <p className="instruction">Person</p>
        </div>

        {!loading && loaded && (
          people ? (
          <div className="person person--page">

            <div className="person__image">
              <img src={person.image ? person.image : '/images/person/default.png'}
                    alt={`Picture of ${person.firstName} ${person.lastName}`} />
            </div>

            <div className="person__details">

              <div className="person__name">
                {person.firstName} {person.lastName} {labelNode}
              </div>

            </div>

            <div className="person__actions">

              { (person.notificationSms || person.notificationEmail) && (
              <div style={{ float: 'left', width: '100%' }}>
                <button className="button button--notify" style={{ marginTop: '1em' }} disabled={notifying} onClick={::this.handleNotification(person)}>
                  <Icon name={(notifying) ? 'sync' : 'alarm'} spin={notifying} /> {(notifying) ? 'Notifying...' : 'Notify'}
                </button>
                <span style={{ opacity: 0.75, display: 'block', textAlign: 'center' }}>This will notify them you're here</span>
                {error &&
                  <span style={{ margin: '0 auto', width: '50%', color: 'red', opacity: 0.75, fontWeight: 500, display: 'block', textAlign: 'center' }}>
                    {error}... :¬( <br /> Something went wrong notifying them. You can try again or contact them with their details below...
                  </span>
                }
              </div>
              )}

              {person.email && (
              <span className="person__email" href={`mailto:${person.email}`}>
                <Icon name="envelope" /> {person.email}
              </span>
              )}

              {person.phone && (
              <span className="person__phone" href={`tel:${person.phone}`}>
                <Icon name="phone-handset" /> {person.phone}
              </span>
              )}

            </div>

          </div>
          ) : (
            <p>No person</p>
          )
        )}

        {loading && <Loader />}

      </div>
      </main>
    );

  }

}
