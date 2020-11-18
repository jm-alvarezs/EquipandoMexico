import {
  PREGUNTAS_RECIBIDAS,
  SET_PREGUNTA,
  SET_PROPIEDAD_USER,
  SET_RESPUESTA_PREGUNTA,
} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case PREGUNTAS_RECIBIDAS:
      return {...state, preguntas: payload};
    case SET_PREGUNTA:
      let preguntas = state.preguntas;
      if (preguntas && preguntas !== null) {
        preguntas = [...preguntas];
      } else {
        preguntas = [];
      }
      const pregunta = preguntas.find(
        (pregunta) => parseInt(pregunta.idPregunta) === parseInt(payload),
      );
      return {...state, pregunta};
    case SET_RESPUESTA_PREGUNTA: {
      const preguntas = [...state.preguntas];
      const index = preguntas.findIndex(
        (pregunta) =>
          parseInt(pregunta.idPregunta) === parseInt(payload.idPregunta),
      );
      const pregunta = {...state.pregunta};
      pregunta.respuesta = payload.respuesta;
      if (index !== -1) {
        preguntas[index].respuesta = payload.respuesta;
      }
      return {...state, preguntas};
    }
    case SET_PROPIEDAD_USER: {
      return {...state, diagnostico: payload};
    }
    default:
      return state;
  }
};
