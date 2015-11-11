const CHECK_TOKEN = 'redux-example/passwords/CHECK_TOKEN';
const CHECK_TOKEN_SUCCESS = 'redux-example/passwords/CHECK_TOKEN_SUCCESS';
const CHECK_TOKEN_FAIL = 'redux-example/passwords/CHECK_TOKEN_FAIL';
const GENERATE_TOKEN = 'redux-example/passwords/GENERATE_TOKEN';
const GENERATE_TOKEN_SUCCESS = 'redux-example/passwords/GENERATE_TOKEN_SUCCESS';
const GENERATE_TOKEN_FAIL = 'redux-example/passwords/GENERATE_TOKEN_FAIL';

const initialState = {
  checked: false,
  generating: false,
  isValidToken: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_TOKEN:
      return {
        ...state,
        checking: true
      };
    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        checking: false,
        isValidToken: true,
        result: action.result
      };
    case CHECK_TOKEN_FAIL:
      return {
        ...state,
        checking: false,
        isValidToken: false,
        error: action.error
      };
    case GENERATE_TOKEN:
      return {
        ...state,
        generating: true
      };
    case GENERATE_TOKEN_SUCCESS:
      return {
        ...state,
        generating: false,
        message: action.result
      };
    case GENERATE_TOKEN_FAIL:
      return {
        ...state,
        generating: false,
        message: null,
        generateError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.passwords && globalState.passwords.loaded;
}

export function checkPasswordToken(token) {
  return {
    types: [CHECK_TOKEN, CHECK_TOKEN_SUCCESS, CHECK_TOKEN_FAIL],
    promise: (client) => client.post('/checkPasswordToken', {
      data: {
        token
      }
    })
  };
}

export function generatePasswordToken(email, invite) {
  return {
    types: [GENERATE_TOKEN, GENERATE_TOKEN_SUCCESS, GENERATE_TOKEN_FAIL],
    promise: (client) => client.post('/generatePasswordToken', {
      data: {
        email, invite
      }
    })
  };
}
