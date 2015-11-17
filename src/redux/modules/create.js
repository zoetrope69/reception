const PERSON = 'reception/create/PERSON';
const PERSON_SUCCESS = 'reception/create/PERSON_SUCCESS';
const PERSON_FAIL = 'reception/create/PERSON_FAIL';

const initialState = {
  creating: false,
  error: '',
  created: false
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
