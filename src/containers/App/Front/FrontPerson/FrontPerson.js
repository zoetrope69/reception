import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Loader } from 'components';
import { pushState } from 'redux-router';
import * as notificationActions from 'redux/modules/notifications';

@connect(
  state => ({
    connected: state.call.connected,
    error: state.notifications.error,
    loaded: state.front.loaded,
    loading: state.front.loading,
    notified: state.notifications.notified,
    notifying: state.notifications.notifying,
    people: state.front.people,
    twilioLoaded: state.call.loaded
  }),
  {...notificationActions, pushState})
export default class FrontPeople extends Component {
  static propTypes = {
    connected: PropTypes.bool,
    error: PropTypes.string,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    notified: PropTypes.bool,
    notify: PropTypes.func,
    notifying: PropTypes.bool,
    params: PropTypes.object,
    people: PropTypes.array.isRequired,
    pushState: PropTypes.func.isRequired,
    twilioLoaded: PropTypes.bool
  }

  constructor() {
    super();

    this.handleNotification = this.handleNotification.bind(this);
    this.disconnectCall = this.disconnectCall.bind(this);
    this.startCallTimer = this.startCallTimer.bind(this);
    this.resetCallTimer = this.resetCallTimer.bind(this);
  }

  state = {
    callTimer: 0
  };

  componentWillReceiveProps(nextProps) {
    const { notified, connected } = nextProps;

    // if not connected reset call timer
    if (!connected) {
      this.disconnectCall();
    } else {
      // drop the call after set timeout
      this.startCallTimer();
    }

    if (notified) {
      this.props.pushState(null, '/front/reception'); // redirect them back to the thank you message
    }
  }

  handleCallClick() {
    const { connected, people, params } = this.props;
    const person = people.find(personItem => personItem._id === params.person);

    console.log('click');

    // if connected then drop the call
    if (connected) {
      console.log('disconnect 2');

      return this.disconnectCall(); // eslint-disable-line no-undef
    }

    console.log('number', person.phone);

    console.log('calling');
    Twilio.Device.connect({ number: '+447534317671' }); // eslint-disable-line no-undef
  }

  disconnectCall() {
    Twilio.Device.disconnectAll(); // eslint-disable-line no-undef
    this.resetCallTimer();
  }

  resetCallTimer() {
    clearInterval(this.timer);
    this.setState({ callTimer: 0 });
  }

  startCallTimer() {
    this.setState({ callTimer: 40 });

    this.timer = setInterval(() => {
      let { callTimer } = this.state;

      // if the call timer is finished then disconnect
      if (callTimer <= 1) {
        return this.disconnectCall();
      }

      callTimer -= 1; // reduce the timer 1 every second
      this.setState({ callTimer });
    }, 1000);
  }

  handleNotification(person) {
    console.log('notification');
    const { notify } = this.props;
    return () => {
      notify(person); // notify the person
    };
  }

  render() {
    const { connected, error, loaded, loading,
            notifying, people, params, twilioLoaded } = this.props;
    const { callTimer } = this.state;
    const person = people.find(personItem => personItem._id === params.person);

    let labelNode;

    if (person && person.type === 'Staff') {
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
              <img src={person.image ? person.image : '/default-person.png'}
                    alt={`Picture of ${person.firstName} ${person.lastName}`} />
            </div>

            <div className="person__details">

              <div className="person__name">
                {person.firstName} {person.lastName} {labelNode}
              </div>

            </div>

            <div className="person__actions">

              {(person.notificationCall) ? (
              <div style={{ float: 'left', width: '100%' }}>
                <button className="button button--notify"
                        style={{ position: 'relative', marginTop: '1em' }}
                        onClick={::this.handleCallClick}
                        disabled={!twilioLoaded}>
                  <Icon name={(connected) ? 'sync' : 'phone-handset'} spin={connected} />{' '}
                  {callTimer !== 0 && (
                    <span style={{
                      position: 'absolute',
                      width: '2em',
                      left: '1.5em',
                      top: '1.1em',
                      fontSize: '.45em'
                    }}>{callTimer}</span>
                  )}
                  {(connected) ? 'Calling...' : 'Call'}
                </button>
              </div>
              ) : (
              <div>
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
