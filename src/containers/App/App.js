import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { isLoaded as isPeopleLoaded, front as loadPeople } from 'redux/modules/people';
import { isLoaded as isCompaniesLoaded, front as loadCompanies } from 'redux/modules/companies';
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
      this.props.pushState(null, '/admin');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/login');
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isCompaniesLoaded(getState())) {
      promises.push(dispatch(loadCompanies()));
    }
    if (!isPeopleLoaded(getState())) {
      promises.push(dispatch(loadPeople()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  render() {

    return (
      <div className="app app--innovation-space">
        <DocumentMeta {...config.app}/>

        <div className="app__content">
          {this.props.children}
        </div>

      </div>
    );
  }
}
