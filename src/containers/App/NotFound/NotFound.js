import React, {Component} from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <main className="page page--not-found">
      <div className="container">
        <h1>Oops! 404!</h1>
        <p>This page is lost in space...</p>
      </div>
      </main>
    );
  }
}
