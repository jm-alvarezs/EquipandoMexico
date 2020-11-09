import {PREGUNTAS_RECIBIDAS, SET_PREGUNTA} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case PREGUNTAS_RECIBIDAS:
      return {...state, preguntas: payload};
    case SET_PREGUNTA:
      const preguntas = [...state.preguntas];
      const pregunta = preguntas.find(
        (pregunta) => parseInt(pregunta.orden) === parseInt(payload),
      );
      return {...state, pregunta};
    default:
      return state;
  }
};
