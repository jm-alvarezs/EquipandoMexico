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
    case SET_RESPUESTA_PREGUNTA: {
      const preguntas = [...state.preguntas];
      const index = preguntas.findIndex(
        (pregunta) => parseInt(pregunta.orden) === parseInt(payload.idPregunta),
      );
      const pregunta = {...state.pregunta};
      pregunta.respuesta = payload.respuesta;
      if (index !== -1) {
        preguntas[index].respuesta = payload.respuesta;
      }
      return {...state, preguntas};
    }
    default:
      return state;
  }
};
