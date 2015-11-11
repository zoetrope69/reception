import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

import {
  App,

  Admin,
  AdminSettings,
  AdminPeople,

  Front,
  FrontHome,
  FrontMenu,
  FrontPeople,
  FrontPerson,
  FrontCompanies,
  FrontCompany,

  InstructionDelivery,
  InstructionHelp,
  InstructionReception,

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

  const requireStaff = (nextState, replaceState, callback) => {
    function checkPermissions() {
      const { auth: { user } } = store.getState();
      if (!user || user.type !== 'Staff') {
        // oops, don't have permissions, so can't be here!
        replaceState(null, '/admin');
      }
      callback();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkPermissions);
    } else {
      checkPermissions();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRedirect to="admin" />

      { /* Routes requiring login */ }
      <Route path="admin" component={Admin} onEnter={requireLogin}>

        <Route onEnter={requireStaff}>
          <Route path="people" component={AdminPeople} />
          <Route path="people/:personId" component={AdminSettings} />
        </Route>

        <Route path="settings" component={AdminSettings} />

        <Route path="*" component={NotFound} status={404} />
      </Route>

      <Route path="front" component={Front}>
        <IndexRoute component={FrontHome} />

        <Route path="menu" component={FrontMenu} />
        <Route path="people" component={FrontPeople} />
        <Route path="people/:person" component={FrontPerson} />
        <Route path="companies" component={FrontCompanies} />
        <Route path="companies/:company" component={FrontCompany} />

        <Route path="instruction/help" component={InstructionHelp} />
        <Route path="instruction/delivery" component={InstructionDelivery} />
        <Route path="instruction/reception" component={InstructionReception} />

      </Route>

      { /* Routes */ }
      <Route path="login" component={Login} />
      <Route path="password/forgot" component={PasswordForgot} />
      <Route path="password/reset" component={PasswordReset} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
