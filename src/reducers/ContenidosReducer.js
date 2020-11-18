import {CONTENIDOS_RECIBIDOS, SET_CONTENIDO} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case CONTENIDOS_RECIBIDOS:
      return {...state, contenidos: payload};
    case SET_CONTENIDO:
      const contenidos = [...state.contenidos];
      const contenido = contenidos.find(
        (content) => content.idContenido === payload,
      );
      return {...state, contenido};
    default:
      return state;
  }
};
