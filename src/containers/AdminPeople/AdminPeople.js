import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, PersonList } from 'components';
import * as settingActions from 'redux/modules/settings';
import { load as loadSettings } from 'redux/modules/settings';

@connect(
  state => ({
    user: state.auth.user,
    people: state.settings.data
  }),
  {...settingActions })
export default class AdminPeople extends Component {
  static propTypes = {
    user: PropTypes.object,
    people: PropTypes.array.isRequired
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadSettings());
  }

  render() {

    const { user } = this.props;
    let { people } = this.props;

    // remove the current user
    people = people.filter(person => person._id !== user._id);

    return (
      <main className="page page--people">
      <div className="container">

        <Link to="/admin/people/new" style={{ float: 'right' }}
              className="button button--success">
          <Icon name="plus-circle" /> Add new
        </Link>

        <h1>People</h1>

        <PersonList people={people} admin />

      </div>
      </main>
    );

  }

}
