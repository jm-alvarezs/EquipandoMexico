import {SHOW_ALERT} from '../types';

export const BASE_URL = 'https://opti.disrupcion.mx/api';

export const displayError = (dispatch, error) => {
  if (typeof error === 'object') {
    if (error.response) {
      if (error.response.status === 412) {
        error = 'Ya existe una cuenta con ese número de teléfono.';
      } else {
        error = error.toString();
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
