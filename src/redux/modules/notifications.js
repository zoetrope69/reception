const NOTIFY = 'reception/notifications/NOTIFY';
const NOTIFY_SUCCESS = 'reception/notifications/NOTIFY_SUCCESS';
const NOTIFY_FAIL = 'reception/notifications/NOTIFY_FAIL';

const initialState = {
  error: '',
  notified: false,
  notifying: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIFY:
      return {
        ...state,
        notifying: true
      };
    case NOTIFY_SUCCESS:
      return {
        ...state,
        notifying: false,
        notified: true
      };
    case NOTIFY_FAIL:
      return {
        ...state,
        notifying: false,
        notified: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.notifications && globalState.notifications.loaded;
}

export function notify(person) {
  return {
    types: [NOTIFY, NOTIFY_SUCCESS, NOTIFY_FAIL],
    promise: (client) => client.post('/notify', {
      data: {
        person
      }
    })
  };
}
