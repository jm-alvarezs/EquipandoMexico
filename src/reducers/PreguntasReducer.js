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
  SET_PREGUNTA_NO,
  SET_RESPUESTA_PREGUNTA_NO,
  SET_PREGUNTA_SI,
  SET_RESPUESTA_PREGUNTA_SI,
  RESPUESTA_RECIBIDA,
  DIAGNOSTICO_RECIBIDO,
  SET_DIAGNOSTICO,
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
      return {...state, pregunta: {...pregunta}};
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
      return {...state, preguntas, pregunta};
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
    case SET_PREGUNTA_NO: {
      const pregunta = [...state.preguntasNo][payload];
      return {...state, pregunta: {...pregunta}};
    }
    case SET_RESPUESTA_PREGUNTA_NO: {
      const preguntasNo = [...state.preguntasNo];
      const index = preguntasNo.findIndex(
        (pregunta) =>
          parseInt(pregunta.idPregunta) === parseInt(payload.idPregunta),
      );
      const pregunta = {...state.pregunta};
      pregunta.respuesta = payload.respuesta;
      if (index !== -1) {
        preguntasNo[index].respuesta = payload.respuesta;
      }
      return {...state, preguntasNo, pregunta};
    }
    case SET_PREGUNTA_SI: {
      const preguntasSi = [...state.preguntasSi];
      const pregunta = preguntasSi[payload];
      return {...state, pregunta};
    }
    case SET_RESPUESTA_PREGUNTA_SI: {
      const preguntasSi = [...state.preguntasSi];
      const index = preguntasSi.findIndex(
        (pregunta) =>
          parseInt(pregunta.idPregunta) === parseInt(payload.idPregunta),
      );
      const pregunta = {...state.pregunta};
      pregunta.respuesta = payload.respuesta;
      if (index !== -1) {
        preguntasSi[index].respuesta = payload.respuesta;
      }
      return {...state, preguntasSi, pregunta};
    }
    case RESPUESTA_RECIBIDA: {
      return {...state, idRespuesta: payload};
    }
    case SET_DIAGNOSTICO: {
      return {...state, idDiagnostico: payload};
    }
    case DIAGNOSTICO_RECIBIDO: {
      return {...state, diagnostico: payload};
    }
    default:
      return state;
  }
};
