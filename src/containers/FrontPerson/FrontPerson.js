import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Person } from 'components';

@connect(state => ({ people: state.people.data }))
export default class FrontPeople extends Component {
  static propTypes = {
    people: PropTypes.object.isRequired,
    params: PropTypes.object
  }

  render() {

    const { people, params } = this.props;
    const person = people.find(tempPerson => tempPerson._id === params.personId);

    return (
      <main className="page page--person">
        <div className="container">

            <div className="top-nav">
                <Link className="back-button" to="/front/people">
                    <Icon name="chevron-left" large /> Back
                </Link>
                <p className="instruction">Person</p>
            </div>

            <Person person={person} key={person._id} personPage />

        </div>
        </main>
    );

  }

}
