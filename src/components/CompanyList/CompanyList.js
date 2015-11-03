import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Company } from 'components';

@connect(state => ({ companies: state.companies.data }))
export default class CompanyList extends Component {
  static propTypes = {
    companies: PropTypes.array.isRequired
  }

  render() {
    const { companies } = this.props;

    companies.sort((aItem, bItem) => {
      if (aItem.name.first < bItem.name.first) return -1;
      if (aItem.name.first > bItem.name.first) return 1;
      return 0;
    });

    return (
      <ul className="companyList">
      {companies.map((company, key) => {
        if (JSON.parse(company.visibility)) {
          return (<Company company={company} key={key} />);
        }
      })}
      </ul>
    );

  }

}
