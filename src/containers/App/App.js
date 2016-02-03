import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import config from '../../config';
import { pushState } from 'redux-router';

@connect(
  state => ({user: state.auth.user}),
  { pushState }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/home');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/login');
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  render() {
    return (
      <div className="app app--innovation-space">
        <Helmet {...config.app}/>

        <div className="app__content">
          {this.props.children}
        </div>

      </div>
    );
  }
}
