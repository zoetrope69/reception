import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class FrontInstructionDelivery extends Component {

  render() {
    return (
      <main className="page page--instruction-delivery">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front/menu">
            <Icon name="chevron-left" large /> Back
          </Link>
          <p className="instruction">Deliveries</p>
        </div>

        <div className="instruction-message">
          <Icon name="gift" />
          <p><em>Deliveries are made to staff</em></p>
          <p>You can find them on <strong>the first floor</strong>&hellip;</p>
        </div>

      </div>
      </main>
    );
  }

}
