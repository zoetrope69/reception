import React, { Component, PropTypes } from 'react';
import { Company } from 'components';

export default class CompanyList extends Component {
  static propTypes = {
    admin: PropTypes.bool,
    companies: PropTypes.array.isRequired
  }

  render() {
    const { admin, companies } = this.props;

    companies.sort((aItem, bItem) => {
      if (aItem.name < bItem.name) return -1;
      if (aItem.name > bItem.name) return 1;
      return 0;
    });

    return (
      <ul className="companyList">
      {companies.map((company, key) => {
        return (admin ? (
          <Company company={company} key={company._id + key} admin={admin} />
        ) : (
          company.visibility && (
            <Company company={company} key={company._id + key} />
          )
        ));
      })}
      </ul>
    );

  }

}
