import {EXPERTOS_RECIBIDOS, SET_EXPERTO} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case EXPERTOS_RECIBIDOS:
      return {...state, expertos: payload};
    case SET_EXPERTO:
      return {...state, experto: payload};
    default:
      return state;
  }
};
