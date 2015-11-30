import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import auth from './auth';
import companies from './companies';
import createPeople from './createPeople';
import createCompanies from './createCompanies';
import { reducer as form } from 'redux-form';
import front from './front';
import notifications from './notifications';
import passwords from './passwords';
import people from './people';

export default combineReducers({
  auth,
  companies,
  createPeople,
  createCompanies,
  form,
  front,
  notifications,
  passwords,
  people,
  router
});
