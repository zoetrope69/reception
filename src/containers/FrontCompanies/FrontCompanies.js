import React, { Component } from 'react';
import { Link } from 'react-router';
import { Icon, CompanyList } from 'components';

export default class FrontCompanies extends Component {

  render() {

    return (
      <main className="page page--people">
        <div className="container">

            <div className="top-nav">
                <Link className="back-button" to="/front/menu">
                    <Icon name="chevron-left" large /> Back
                </Link>
                <p className="instruction">Companies</p>
            </div>

            <CompanyList pollInterval={1000} />

        </div>
        </main>
    );

  }

}
