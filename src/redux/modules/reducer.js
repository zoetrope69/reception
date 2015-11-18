import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import auth from './auth';
import companies from './companies';
import create from './create';
import { reducer as form } from 'redux-form';
import front from './front';
import notifications from './notifications';
import passwords from './passwords';
import people from './people';

export default combineReducers({
  auth,
  companies,
  create,
  form,
  front,
  notifications,
  passwords,
  people,
  router
});
