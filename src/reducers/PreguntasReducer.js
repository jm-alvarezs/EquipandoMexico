import {
  PREGUNTAS_RECIBIDAS,
  PREGUNTA_RECIBIDA,
  SET_PREGUNTA,
  SET_PROPIEDAD_USER,
  SET_RESPUESTA_PREGUNTA,
  TIPOS_PREGUNTA_RECIBIDOS,
} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case PREGUNTAS_RECIBIDAS:
      return {...state, ...payload};
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
    case PREGUNTA_RECIBIDA: {
      return {...state, pregunta: payload};
    }
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
    case PUSH_PREGUNTA: {
      const preguntasStack = [...state.preguntasStack];
      preguntasStack.push(payload);
      return {...state, preguntasStack};
    }
    case POP_PREGUNTA: {
      const preguntasStack = [...state.preguntasStack];
      const pregunta = preguntasStack[preguntasStack.length - 1];
      preguntasStack.splice(preguntasStack.length - 1, 1);
      return {...state, pregunta, preguntas};
    }
    case TIPOS_PREGUNTA_RECIBIDOS:
      return {...state, tipos: payload};
    default:
      return state;
  }
};
