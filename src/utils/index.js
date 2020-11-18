export const BASE_URL =
  (process.env.NODE_ENV === 'development' ? 'http://192.168.1.64:4000' : '') +
  '/api';

export const displayError = (dispatch, error) => {
  if (typeof error === 'object') {
    error = error.toString();
  }
  console.log(error);
};

export const displaySuccess = (dispatch, message) => {
  console.log(message);
};
