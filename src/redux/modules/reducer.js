import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { reducer as form } from 'redux-form';
import auth from './auth';
import call from './call';
import companies from './companies';
import createCompanies from './createCompanies';
import createPeople from './createPeople';
import front from './front';
import image from './image';
import notifications from './notifications';
import passwords from './passwords';
import people from './people';

export default combineReducers({
  auth,
  call,
  companies,
  createCompanies,
  createPeople,
  form,
  front,
  image,
  notifications,
  passwords,
  people,
  router
});
