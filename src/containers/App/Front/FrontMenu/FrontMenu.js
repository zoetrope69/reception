import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class FrontMenu extends Component {

  render() {

    return (
      <main className="page page--home">
      <div className="container">

          <div className="top-nav">
              <Link className="back-button" to="/front">
                  <Icon name="chevron-left" /> Back
              </Link>
              <p className="instruction">Pick an option</p>
          </div>

          <Link to="/front/people" className="button">
              <Icon name="users" /> Members
          </Link>
          <Link to="/front/companies" className="button">
              <Icon name="briefcase" /> Companies
          </Link>

          <div className="button-group">
              <Link to="/front/delivery" className="button">
                  <Icon name="gift" /> Deliveries
              </Link>
              <Link to="/front/help" className="button">
                  <Icon name="question-circle" /> Help
              </Link>
          </div>

      </div>
      </main>
    );

  }

}
