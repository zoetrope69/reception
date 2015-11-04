import React, { Component } from 'react';
import { PersonList } from 'components';

export default class AdminPeople extends Component {

  render() {

    return (
      <main className="page page--people">
      <div className="container">

        <h1>People</h1>

        <PersonList admin />

      </div>
      </main>
    );

  }

}
