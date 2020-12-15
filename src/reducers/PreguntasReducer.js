import {
  PREGUNTAS_RECIBIDAS,
  PREGUNTA_RECIBIDA,
  SET_PREGUNTA,
  SET_PROPIEDAD_USER,
  SET_RESPUESTA_PREGUNTA,
  TIPOS_PREGUNTA_RECIBIDOS,
  PUSH_PREGUNTA,
  POP_PREGUNTA,
  OPCIONES_RECIBIDAS,
  SET_PREGUNTA_COGNICION,
  SET_PROPIEDAD_COGNICION,
} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case PREGUNTAS_RECIBIDAS:
      return {...state, ...payload, pregunta: payload.preguntas[0]};
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
      let preguntasStack = state.preguntasStack;
      if (preguntasStack === null) preguntasStack = [];
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
    case OPCIONES_RECIBIDAS:
      return {...state, opciones: payload};
    case SET_PREGUNTA_COGNICION: {
      const preguntas = state.preguntasNo;
      if (preguntas === null || !preguntas) preguntas = [];
      let pregunta = preguntas[0];
      return {...state, pregunta: {...pregunta}};
    }
    case SET_PROPIEDAD_COGNICION: {
      const opciones = [...state.opciones];
      const index = opciones.findIndex(
        (opcion) => opcion.idPreguntaCognicion === payload.idPreguntaCognicion,
      );
      if (index !== -1) {
        opciones[index].checked = payload.value;
      }
      return {...state, opciones};
    }
    default:
      return state;
  }
};
