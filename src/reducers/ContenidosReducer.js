import {CONTENIDOS_RECIBIDOS, SET_CONTENIDO} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case CONTENIDOS_RECIBIDOS:
      return {...state, contenidos: payload};
    case SET_CONTENIDO:
      return {...state, contenido: payload};
    default:
      return state;
  }
};
