import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, Loader, PersonList } from 'components';

@connect(state => ({
  loaded: state.front.loaded,
  loading: state.front.loading,
  people: state.front.people
}))
export default class FrontPeople extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
    loading: PropTypes.bool
  }

  render() {
    const { loaded, loading, people } = this.props;

    return (
      <main className="page page--people">
      <div className="container">

        <div className="top-nav">
          <Link className="back-button" to="/front/menu">
            <Icon name="chevron-left" /> Back
          </Link>
          <p className="instruction">Members</p>
        </div>

        {!loading && loaded && (
          people ? (
            <PersonList people={people} />
          ) : (
            <p>No people</p>
          )
        )}

        {loading && <Loader />}

      </div>
      </main>
    );
  }

}
