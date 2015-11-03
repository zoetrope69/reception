const LOAD = 'redux-example/passwords/LOAD';
const LOAD_SUCCESS = 'redux-example/passwords/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/passwords/LOAD_FAIL';
const LOGIN = 'redux-example/passwords/LOGIN';
const LOGIN_SUCCESS = 'redux-example/passwords/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/passwords/LOGIN_FAIL';
const LOGOUT = 'redux-example/passwords/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/passwords/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/passwords/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function generatePasswordToken(token, invite) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/generatePasswordToken', {
      data: {
        token, invite
      }
    })
  };
}

export function checkPasswordToken(token) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/checkPasswordToken', {
      data: {
        token
      }
    })
  };
}
