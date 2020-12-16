import {
  CONTENIDOS_RECIBIDOS,
  SET_CONTENIDO,
  SHOW_SPINNER,
  USER_CREATED,
} from '../types';

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
    case SHOW_SPINNER:
      return {...state, spinner: true};
    case USER_CREATED:
      return {...state, created: true, spinner: false};
    default:
      return state;
  }
};
