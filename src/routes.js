import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

import {
  App,

  Admin,
  AdminCompanies,
  AdminCompany,
  AdminCompanyNew,
  AdminHome,
  AdminPerson,
  AdminPersonNew,
  AdminPeople,

  Front,
  FrontCompanies,
  FrontCompany,
  FrontHome,
  FrontInstructionDelivery,
  FrontInstructionHelp,
  FrontInstructionReception,
  FrontMenu,
  FrontPeople,
  FrontPerson,

  Login,
  PasswordReset,
  PasswordForgot,

  NotFound

} from 'containers';

export default (store) => {

  const requireLogin = (nextState, replaceState, callback) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/login');
      }
      callback();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireOwner = (nextState, replaceState, callback) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      callback();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireAdmin = (nextState, replaceState, callback) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user || (user.role !== 'admin')) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      callback();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="home" />

      <Route path="login" component={Login} />
      <Route path="password/forgot" component={PasswordForgot} />
      <Route path="password/reset" component={PasswordReset} />

      { /* backend routes */ }
      <Route component={Admin} onEnter={requireLogin}>
        <Route path="home" component={AdminHome} />

        <Route onEnter={requireOwner}>
          <Route onEnter={requireAdmin}>
            <Route path="companies" component={AdminCompanies} />
            <Route path="company/new" component={AdminCompanyNew} />
          </Route>
          <Route path="company/:company" component={AdminCompany} />
          <Route path="people" component={AdminPeople} />
          <Route path="person/new" component={AdminPersonNew} />
          <Route path="person/:person" component={AdminPerson} />
        </Route>

        <Route path="profile" component={AdminPerson} />
      </Route>

      { /* frontend routes */ }
      <Route path="front" component={Front}>
        <IndexRoute component={FrontHome} />

        <Route path="companies" component={FrontCompanies} />
        <Route path="company/:company" component={FrontCompany} />
        <Route path="menu" component={FrontMenu} />
        <Route path="people" component={FrontPeople} />
        <Route path="person/:person" component={FrontPerson} />

        <Route path="delivery" component={FrontInstructionDelivery} />
        <Route path="help" component={FrontInstructionHelp} />
        <Route path="reception" component={FrontInstructionReception} />

      </Route>

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
