const LOAD = 'reception/companies/LOAD';
const LOAD_SUCCESS = 'reception/companies/LOAD_SUCCESS';
const LOAD_FAIL = 'reception/companies/LOAD_FAIL';
const EDIT_START = 'reception/companies/EDIT_START';
const EDIT_STOP = 'reception/companies/EDIT_STOP';
const SAVE = 'reception/companies/SAVE';
const SAVE_SUCCESS = 'reception/companies/SAVE_SUCCESS';
const SAVE_FAIL = 'reception/companies/SAVE_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  editing: false,
  saveError: ''
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
        data: action.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[data.findIndex(dataItem => dataItem._id === action.id)] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
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

export function front() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/companies/front')
  };
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

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
