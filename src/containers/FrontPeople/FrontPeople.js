import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon, PersonList } from 'components';

export default class FrontPeople extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  render() {

    const { params } = this.props;

    let backPath = '/front/menu';
    let companyName = '';
    let companyNode = null;

    if (params && typeof params.companyName !== 'undefined') {
      backPath = '/front/companies';
      companyName = params.companyName;

      companyNode = (
          <div className="company" style={{ 'width': '100%', 'padding': 0 }}>
              <span className="company__name" style={{ 'float': 'right', 'textAlign': 'right', 'margin': '0 .75em' }}>in {companyName}</span>
          </div>
      );
    }

    return (
      <main className="page page--people">
        <div className="container">

            <div className="top-nav">
                <Link className="back-button" to={backPath}>
                    <Icon name="chevron-left" large /> Back
                </Link>
                <p className="instruction">Members</p>
            </div>

            {companyNode}

            <PersonList companyName={companyName} />

        </div>
        </main>
    );

  }

}
