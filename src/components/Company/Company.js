import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

export default class Company extends Component {
  static propTypes = {
    admin: PropTypes.bool,
    company: PropTypes.object.isRequired
  }

  render() {

    const { admin, company } = this.props;

    const path = (admin ? 'company' : 'front/company');

    return (
      <Link to={`/${path}/${company._id}`} className={'company' + (admin ? ' company--admin' : '')}>
        <span className="company__name">
          {company.name}

          {admin && !JSON.parse(company.visibility) && (
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
