import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Company extends Component {
  static propTypes = {
    company: PropTypes.object.isRequired
  }

  render() {

    const { company } = this.props;

    console.log(company);

    return (
      <Link to={`/front/companies/${company._id}`} className="company">
        <span className="company__name">{company.name}</span>
        {company.image && (
        <div className="company__logo">
          <img src={`/images/company/${company.image}`} alt={`${company.name}'s logo`} />
        </div>
        )}
      </Link>
    );
  }

}