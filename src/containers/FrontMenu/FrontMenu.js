import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class FrontMenu extends Component {

  render() {

    return (
      <main className="page page--home">
      <div className="wrapper">

          <div className="top-nav">
              <Link className="back-button" to="/front">
                  <Icon name="chevron-left" large /> Back
              </Link>
              <p className="instruction">Pick an option</p>
          </div>

          <Link to="/front/people" className="button">
              <Icon name="users" large /> Members
          </Link>
          <Link to="/front/companies" className="button">
              <Icon name="briefcase" large /> Companies
          </Link>

          <div className="button-group">
              <Link to="/front/instruction/delivery" className="button">
                  <Icon name="gift" large /> Deliveries
              </Link>
              <Link to="/front/instruction/help" className="button">
                  <Icon name="question-circle" large /> Help
              </Link>
          </div>

      </div>
      </main>
    );

  }

}
