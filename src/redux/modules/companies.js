const LOAD = 'reception/companies/LOAD';
const LOAD_SUCCESS = 'reception/companies/LOAD_SUCCESS';
const LOAD_FAIL = 'reception/companies/LOAD_FAIL';
const SAVE = 'reception/companies/SAVE';
const SAVE_SUCCESS = 'reception/companies/SAVE_SUCCESS';
const SAVE_FAIL = 'reception/companies/SAVE_FAIL';

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
        error: null
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
  return globalState.companies && globalState.companies.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/companies/load')
  };
}

export function save(setting) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: setting._id,
    promise: (client) => client.post('/companies/update', {
      data: setting
    })
  };
}
