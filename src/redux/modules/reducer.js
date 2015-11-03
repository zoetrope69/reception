import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import companies from './companies';
import counter from './counter';
import { reducer as form } from 'redux-form';
import people from './people';
import settings from './settings';

export default combineReducers({
  router: routerStateReducer,
  auth,
  companies,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  people,
  settings
});
