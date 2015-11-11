import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, CompanyList } from 'components';

@connect(state => ({ companies: state.companies.data }))
export default class FrontCompanies extends Component {
  static propTypes = {
    companies: PropTypes.array.isRequired
  }

  render() {

    const { companies } = this.props;

    return (
      <main className="page page--people">
        <div className="container">

            <div className="top-nav">
                <Link className="back-button" to="/front/menu">
                    <Icon name="chevron-left" large /> Back
                </Link>
                <p className="instruction">Companies</p>
            </div>

            <CompanyList companies={companies} />

        </div>
        </main>
    );

  }

}
