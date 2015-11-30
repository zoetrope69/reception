const LOAD = 'reception/people/LOAD';
const LOAD_SUCCESS = 'reception/people/LOAD_SUCCESS';
const LOAD_FAIL = 'reception/people/LOAD_FAIL';
const SAVE = 'reception/people/SAVE';
const SAVE_SUCCESS = 'reception/people/SAVE_SUCCESS';
const SAVE_FAIL = 'reception/people/SAVE_FAIL';

const initialState = {
  error: '',
  loaded: false,
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: ''
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[data.findIndex(dataItem => dataItem._id === action.id)] = action.result;
      return {
        ...state,
        data: data,
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.people && globalState.people.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/people/load')
  };
}

export function save(people) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: people._id,
    promise: (client) => client.post('/people/update', {
      data: people
    })
  };
}
