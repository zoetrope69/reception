import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, PersonList } from 'components';

@connect(state => ({ people: state.people.data }))
export default class AdminPeople extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired
  }

  render() {

    const { people } = this.props;

    return (
      <main className="page page--people">
      <div className="container">

        <button style={{ float: 'right' }}
                className="button button--success">
          <Icon name="plus" /> Add new
        </button>

        <h1>People</h1>

        <PersonList people={people} admin />

      </div>
      </main>
    );

  }

}
