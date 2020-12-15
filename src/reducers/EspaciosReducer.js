import {ESPACIOS_RECIBIDOS} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case ESPACIOS_RECIBIDOS:
      return {...state, espacios: payload};
    default:
      return {...state};
  }
};
