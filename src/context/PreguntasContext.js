import React, {createContext, useReducer} from 'react';
import PreguntasReducer from '../reducers/PreguntasReducer';
import PreguntasService from '../services/PreguntasService';
import {
  PREGUNTAS_RECIBIDAS,
  SET_PREGUNTA,
  POP_PREGUNTA,
  SET_PROPIEDAD_USER,
  SET_RESPUESTA_PREGUNTA,
  PUSH_PREGUNTA,
  TIPOS_PREGUNTA_RECIBIDOS,
  OPCIONES_RECIBIDAS,
  SET_PREGUNTA_COGNICION,
  SET_PROPIEDAD_COGNICION,
} from '../types';

const initialState = {
  tipos: null,
  preguntas: null,
  preguntasNo: null,
  preguntasSi: null,
  pregunta: null,
  diagnostico: null,
  preguntasStack: null,
};

export const PreguntasContext = createContext(initialState);

export const PreguntasProvider = ({children}) => {
  const [state, dispatch] = useReducer(PreguntasReducer, initialState);

  function getTiposPregunta() {
    PreguntasService.getTiposPregunta().then((res) => {
      const {tipos} = res.data;
      dispatch({type: TIPOS_PREGUNTA_RECIBIDOS, payload: tipos});
    });
  }

  function getPreguntas(idTipoPregunta) {
    PreguntasService.getPreguntas(idTipoPregunta).then((res) => {
      const {principales, si, no} = res.data;
      const preguntasSi = si;
      const preguntasNo = no;
      const preguntas = principales;
      dispatch({
        type: PREGUNTAS_RECIBIDAS,
        payload: {preguntas, preguntasSi, preguntasNo},
      });
    });
  }

  function getPregunta(idPregunta) {
    dispatch({type: SET_PREGUNTA, payload: idPregunta});
  }

  function getCognicion(idPregunta) {
    PreguntasService.getCognicion(idPregunta).then((res) => {
      const {preguntasCognicion} = res.data;
      console.log(preguntasCognicion);
      dispatch({type: OPCIONES_RECIBIDAS, payload: preguntasCognicion});
    });
  }

  function postPreguntas(preguntas) {
    PreguntasService.postPreguntas(preguntas).then((res) => {
      const {diagnostico} = res.data;
      dispatch({type: SET_PROPIEDAD_USER, payload: diagnostico});
    });
  }

  const setRespuestaPregunta = (idPregunta, respuesta) => {
    dispatch({type: SET_RESPUESTA_PREGUNTA, payload: {idPregunta, respuesta}});
  };

  const pushPregunta = (pregunta) => {
    dispatch({type: PUSH_PREGUNTA, payload: pregunta});
  };

  const popPegunta = () => {
    dispatch({type: POP_PREGUNTA});
  };

  const setPreguntaCognicion = (index) => {
    dispatch({type: SET_PREGUNTA_COGNICION, payload: index});
  };
  const setPropiedadCognicion = (idPreguntaCognicion, value) => {
    dispatch({
      type: SET_PROPIEDAD_COGNICION,
      payload: {idPreguntaCognicion, value},
    });
  };

  return (
    <PreguntasContext.Provider
      value={{
        ...state,
        popPegunta,
        getPregunta,
        getCognicion,
        pushPregunta,
        getPreguntas,
        postPreguntas,
        getTiposPregunta,
        setRespuestaPregunta,
        setPreguntaCognicion,
        setPropiedadCognicion,
      }}>
      {children}
    </PreguntasContext.Provider>
  );
};
