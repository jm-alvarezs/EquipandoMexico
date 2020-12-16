import {
  EXPERTOS_RECIBIDOS,
  SET_EXPERTO,
  SHOW_SPINNER,
  USER_CREATED,
} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case EXPERTOS_RECIBIDOS:
      return {...state, expertos: payload};
    case SET_EXPERTO:
      return {...state, experto: payload};
    case SHOW_SPINNER:
      return {...state, spinner: true};
    case USER_CREATED:
      return {...state, created: true, spinner: false};
    default:
      return state;
  }
};
