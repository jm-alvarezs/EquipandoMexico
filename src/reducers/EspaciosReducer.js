import {ESPACIOS_RECIBIDOS, SET_ESPACIO} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case ESPACIOS_RECIBIDOS:
      return {...state, espacios: payload};
    case SET_ESPACIO:
      return {...state, espacio: payload};
    default:
      return {...state};
  }
};
