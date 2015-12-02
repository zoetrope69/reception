const CREATE = 'reception/createCompanies/CREATE';
const CREATE_SUCCESS = 'reception/createCompanies/CREATE_SUCCESS';
const CREATE_FAIL = 'reception/createCompanies/CREATE_FAIL';

const initialState = {
  created: false,
  creating: false,
  error: '',
  message: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        creating: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        message: action.result,
        error: ''
      };
    case CREATE_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        message: '',
        error: action.error
      };
    default:
      return state;
  }
}

export function isCreated(globalState) {
  return globalState.createCompanies && globalState.createCompanies.created;
}

export function create(company) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/create/companyCreate', {
      data: {
        company
      }
    })
  };
}
