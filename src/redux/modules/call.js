const TOKEN = 'reception/call/TOKEN';
const TOKEN_SUCCESS = 'reception/call/TOKEN_SUCCESS';
const TOKEN_FAIL = 'reception/call/TOKEN_FAIL';
const LOADED = 'reception/call/LOADED';
const CONNECTED = 'reception/call/CONNECTED';
const DISCONNECTED = 'reception/call/DISCONNECTED';

const initialState = {
  token: '',
  generatingToken: false,
  loaded: false,
  connected: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        generatingToken: true,
        token: ''
      };
    case TOKEN_SUCCESS:
      return {
        ...state,
        generatingToken: false,
        token: action.result
      };
    case TOKEN_FAIL:
      return {
        ...state,
        generatingToken: false,
        token: ''
      };
    case LOADED:
      return {
        ...state,
        loaded: true
      };
    case CONNECTED:
      return {
        ...state,
        connected: true
      };
    case DISCONNECTED:
      return {
        ...state,
        connected: false
      };
    default:
      return state;
  }
}

export function disconnected() {
  return {
    type: DISCONNECTED
  };
}

export function connected() {
  return {
    type: CONNECTED
  };
}

export function loaded() {
  return {
    type: LOADED
  };
}

export function generateToken() {
  return {
    types: [TOKEN, TOKEN_SUCCESS, TOKEN_FAIL],
    promise: (client) => client.post('/generateTwilioCallToken')
  };
}
