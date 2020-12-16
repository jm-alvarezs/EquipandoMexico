import {SHOW_ALERT} from '../types';

export const BASE_URL =
  (process.env.NODE_ENV === 'development' ? 'http://192.168.1.64:4000' : '') +
  '/api';

export const displayError = (dispatch, error) => {
  if (typeof error === 'object') {
    if (error.response) {
      if (error.response.status === 412) {
        error = 'Ya existe una cuenta con ese número de teléfono.';
      }
    } else {
      error = error.toString();
    }
  }
  dispatch({type: SHOW_ALERT, payload: error});
};

export const displaySuccess = (dispatch, message) => {
  console.log(message);
};
