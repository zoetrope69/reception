import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, PersonList } from 'components';

@connect(state => ({ people: state.people.data }))
export default class FrontPeople extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired
  }

  render() {

    const { people } = this.props;

    return (
      <main className="page page--people">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front/menu">
            <Icon name="chevron-left" large /> Back
          </Link>
          <p className="instruction">Members</p>
        </div>

        <PersonList people={people} />

      </div>
      </main>
    );

  }

}
