import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoaded } from 'redux/modules/front';
import { load as loadFront } from 'redux/modules/front';
import * as callActions from 'redux/modules/call';

@connect(
  state => ({
    token: state.call.token,
    generatingToken: state.call.generatingToken,
  }),
  { ...callActions })
export default class Front extends Component {

  static propTypes = {
    token: PropTypes.string,
    generateToken: PropTypes.func,
    loaded: PropTypes.func,
    connected: PropTypes.func,
    disconnected: PropTypes.func,
    children: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.initiateTwilio = this.initiateTwilio.bind(this);
    this.initiateTwilio();
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(loadFront()));
    }
    return Promise.all(promises);
  }

  initiateTwilio() {
    const { generateToken, connected, disconnected, loaded } = this.props;
    console.log('initTwilio');
    this.loadScript('//static.twilio.com/libs/twiliojs/1.3/twilio.min.js')
      .then(() => {
        console.log('Twilio was loaded');
        generateToken().then((result) => {
          const token = result.result;
          /* eslint-disable no-undef */
          // dirty timeout to ensure Twilio has been created
          setTimeout(() => {
            Twilio.Device.setup(token, { debug: true });

            Twilio.Device.ready(() => {
              console.log('Twilio ready');
              loaded();
            });

            Twilio.Device.error((error) => {
              console.log('Twilio error', error);
              disconnected();
            });

            Twilio.Device.connect((conn) => {
              console.log('Call connected', conn);
              connected();
            });

            Twilio.Device.disconnect((conn) => {
              console.log('Call disconnected', conn);
              disconnected();
            });
          }, 1000);
          /* eslint-enable no-undef */
        });
      })
      .catch(console.log('Twilio wasn\'t loaded'));
  }

  loadScript(url) {
    return new Promise((resolve, reject) => {
      // check if the twilio script file
      if (typeof Twilio !== 'undefined' ) {
        reject();
      }

      const head = document.getElementsByTagName('head')[0];

      const scripts = head.querySelectorAll('script');
      for (let scriptCount = 0; scriptCount < scripts.length; scriptCount++) {
        const script = scripts[scriptCount];
        // check for a twilio.min.js script
        // if it exists we can reject out of loading again
        if ( script.src.indexOf('twilio.min.js') !== -1 ) {
          reject();
        }
      }

      // adding the script tag to the head as suggested before
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      // then bind the event to the callback function.
      // there are several events for cross browser compatibility.
      script.onreadystatechange = resolve;
      script.onload = resolve;

      // fire the loading
      head.appendChild(script);
    });
  }

  render() {
    return (
    <div className="front">

      <div className="front__content">
        {this.props.children}
      </div>

    </div>
    );
  }

}
