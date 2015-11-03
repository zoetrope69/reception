import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

import {
  App,

  Home,

  Admin,
  AdminSettings,

  Front,
  FrontHome,
  FrontMenu,
  FrontPeople,
  FrontPerson,
  FrontCompanies,

  InstructionDelivery,
  InstructionHelp,
  InstructionReception,

  Login,
  LoginSuccess,
  PasswordReset,

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

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes requiring login */ }
      <Route path="admin" component={Admin} > // onEnter={requireLogin}
        <Route path="loginSuccess" component={LoginSuccess} />
        <Route path="settings" component={AdminSettings} />
      </Route>

      <Route path="front" component={Front}>
        <IndexRoute component={FrontHome} />

        <Route path="menu" component={FrontMenu} />
        <Route path="people" component={FrontPeople} />
        <Route path="people/:personId" component={FrontPerson} />
        <Route path="companies" component={FrontCompanies} />
        <Route path="companies/:companyName" component={FrontPeople} />

        <Route path="instruction/help" component={InstructionHelp} />
        <Route path="instruction/delivery" component={InstructionDelivery} />
        <Route path="instruction/reception" component={InstructionReception} />

      </Route>

      { /* Routes */ }
      <Route path="login" component={Login} />
      <Route path="passwordReset" component={PasswordReset} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
