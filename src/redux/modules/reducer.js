import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import companies from './companies';
import counter from './counter';
import { reducer as form } from 'redux-form';
import notifications from './notifications';
import passwords from './passwords';
import people from './people';
import settings from './settings';
import settingsCompanies from './settingsCompanies';

export default combineReducers({
  router: routerStateReducer,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),

  auth,
  companies,
  form,
  notifications,
  passwords,
  people,
  settings,
  settingsCompanies
});
