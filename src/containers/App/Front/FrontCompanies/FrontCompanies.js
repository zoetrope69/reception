import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, Loader, CompanyList } from 'components';

@connect(state => ({
  companies: state.front.companies,
  loaded: state.front.loaded,
  loading: state.front.loading
}))
export default class FrontCompanies extends Component {
  static propTypes = {
    companies: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool
  }

  render() {
    const { companies, loaded, loading } = this.props;

    return (
      <main className="page page--people">
        <div className="container">

            <div className="top-nav">
                <Link className="back-button" to="/front/menu">
                    <Icon name="chevron-left" /> Back
                </Link>
                <p className="instruction">Companies</p>
            </div>

            {!loading && loaded && (
              companies ? (
                <CompanyList companies={companies} />
              ) : (
                <p>No companies</p>
              )
            )}

            {loading && <Loader />}

        </div>
        </main>
    );
  }

}
