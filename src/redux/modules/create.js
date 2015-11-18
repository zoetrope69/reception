const PERSON = 'reception/create/PERSON';
const PERSON_SUCCESS = 'reception/create/PERSON_SUCCESS';
const PERSON_FAIL = 'reception/create/PERSON_FAIL';
const COMPANY = 'reception/create/COMPANY';
const COMPANY_SUCCESS = 'reception/create/COMPANY_SUCCESS';
const COMPANY_FAIL = 'reception/create/COMPANY_FAIL';

const initialState = {
  created: false,
  creating: false,
  error: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case PERSON:
      return {
        ...state,
        creating: true
      };
    case PERSON_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true
      };
    case PERSON_FAIL:
      return {
        ...state,
        notifying: false,
        created: false,
        error: action.result
      };
    case COMPANY:
      return {
        ...state,
        creating: true
      };
    case COMPANY_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true
      };
    case COMPANY_FAIL:
      return {
        ...state,
        notifying: false,
        created: false,
        error: action.result
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.create && globalState.create.loaded;
}

export function createPerson(person) {
  return {
    types: [PERSON, PERSON_SUCCESS, PERSON_FAIL],
    promise: (client) => client.post('/create/personCreate', {
      data: {
        person
      }
    })
  };
}

export function createCompany(company) {
  return {
    types: [COMPANY, COMPANY_SUCCESS, COMPANY_FAIL],
    promise: (client) => client.post('/create/companyCreate', {
      data: {
        company
      }
    })
  };
}
