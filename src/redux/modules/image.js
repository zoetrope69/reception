const UPLOAD = 'reception/image/UPLOAD';
const UPLOAD_SUCCESS = 'reception/image/UPLOAD_SUCCESS';
const UPLOAD_FAIL = 'reception/image/UPLOAD_FAIL';

const initialState = {
  error: '',
  uploaded: false,
  uploading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        uploading: true,
        uploaded: false,
        error: ''
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        uploaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function upload(image) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/image/upload', {
      data: image
    })
  };
}
