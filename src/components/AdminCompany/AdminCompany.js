import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class AdminCompany extends Component {
  static propTypes = {
    company: PropTypes.object.isRequired
  }

  render() {

    const { company } = this.props;

    return (
      <Link to={`/admin/companies/${company._id}`} className="company company--admin">
        <span className="company__name">
          {company.name}

          {!JSON.parse(company.visibility) && (
            <Icon name="eye" />
          )}
        </span>
        {company.image && (
        <div className="company__logo">
          <img src={`/images/company/${company.image}`} alt={`${company.name}'s logo`} />
        </div>
        )}
      </Link>
    );
  }

}
