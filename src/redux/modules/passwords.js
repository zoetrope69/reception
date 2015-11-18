const CHECK_TOKEN = 'reception/passwords/CHECK_TOKEN';
const CHECK_TOKEN_SUCCESS = 'reception/passwords/CHECK_TOKEN_SUCCESS';
const CHECK_TOKEN_FAIL = 'reception/passwords/CHECK_TOKEN_FAIL';
const GENERATE_TOKEN = 'reception/passwords/GENERATE_TOKEN';
const GENERATE_TOKEN_SUCCESS = 'reception/passwords/GENERATE_TOKEN_SUCCESS';
const GENERATE_TOKEN_FAIL = 'reception/passwords/GENERATE_TOKEN_FAIL';
const RESET = 'reception/passwords/RESET';
const RESET_SUCCESS = 'reception/passwords/RESET_SUCCESS';
const RESET_FAIL = 'reception/passwords/RESET_FAIL';

const initialState = {
  checked: false,
  error: '',
  generateError: '',
  generating: false,
  isValidToken: false,
  resetting: false,
  successful: false
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
        token: action.result
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
        sentEmail: true,
        message: action.result
      };
    case GENERATE_TOKEN_FAIL:
      return {
        ...state,
        generating: false,
        sentEmail: false,
        message: null,
        generateError: action.error
      };
    case RESET:
      return {
        ...state,
        resetting: true
      };
    case RESET_SUCCESS:
      return {
        ...state,
        resetting: false,
        successful: true,
        message: action.result
      };
    case RESET_FAIL:
      return {
        ...state,
        resetting: false,
        successful: false,
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
    promise: (client) => client.post('/password/checkToken', {
      data: {
        token
      }
    })
  };
}

export function generatePasswordToken(email, invite) {
  return {
    types: [GENERATE_TOKEN, GENERATE_TOKEN_SUCCESS, GENERATE_TOKEN_FAIL],
    promise: (client) => client.post('/password/generateToken', {
      data: {
        email, invite
      }
    })
  };
}

export function resetPassword(token, password, passwordConfirm) {
  return {
    types: [RESET, RESET_SUCCESS, RESET_FAIL],
    promise: (client) => client.post('/password/reset', {
      data: {
        token, password, passwordConfirm
      }
    })
  };
}
