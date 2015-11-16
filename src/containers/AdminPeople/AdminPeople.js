import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, PersonList } from 'components';
import { load as loadPeople } from 'redux/modules/people';

@connect(state => ({
  user: state.auth.user,
  people: state.people.data
}))
export default class AdminPeople extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  static fetchDataDeferred(getState, dispatch) {
    return dispatch(loadPeople());
  }

  render() {

    const { user } = this.props;
    let { people } = this.props;

    // remove current user from this list
    people = people.filter(person => person._id !== user._id);

    return (
      <main className="page page--people">
      <div className="container">

        <button style={{ float: 'right' }}
                className="button button--success">
          <Icon name="plus-circle" /> Add new
        </button>

        <h1>People</h1>

        <PersonList people={people} admin />

      </div>
      </main>
    );

  }

}
