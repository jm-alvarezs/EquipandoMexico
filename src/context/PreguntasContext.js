import React, {createContext, useReducer} from 'react';
import PreguntasReducer from '../reducers/PreguntasReducer';
import DiagnosticosService from '../services/DiagnosticosService';
import PreguntasService from '../services/PreguntasService';
import RespuestasService from '../services/RespuestasService';
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
  SET_PREGUNTA_NO,
  SET_RESPUESTA_PREGUNTA_NO,
  SET_PREGUNTA_SI,
  SET_RESPUESTA_PREGUNTA_SI,
  RESPUESTA_RECIBIDA,
  DIAGNOSTICO_RECIBIDO,
  SET_DIAGNOSTICO,
} from '../types';

const initialState = {
  tipos: null,
  preguntas: null,
  preguntasNo: null,
  preguntasSi: null,
  pregunta: null,
  diagnostico: null,
  preguntasStack: null,
  idRespuesta: null,
  idDiagnostico: null,
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
      console.log(res.data);
      dispatch({
        type: PREGUNTAS_RECIBIDAS,
        payload: {preguntas, preguntasSi, preguntasNo},
      });
    });
  }

  function getPregunta(idPregunta) {
    console.log(idPregunta);
    dispatch({type: SET_PREGUNTA, payload: idPregunta});
  }

  function getCognicion(idPregunta) {
    PreguntasService.getCognicion(idPregunta).then((res) => {
      const {preguntasCognicion} = res.data;
      dispatch({type: OPCIONES_RECIBIDAS, payload: preguntasCognicion});
    });
  }

  function postCognicion(idDiagnostico, idRespuesta, opciones) {
    opciones.forEach((opcion) => {
      if (opcion.checked) {
        const {idPreguntaCognicion} = opcion;
        RespuestasService.postRespuestaCognicion(
          idDiagnostico,
          idRespuesta,
          idPreguntaCognicion,
        );
      }
    });
  }

  function postPreguntas(preguntas) {
    PreguntasService.postPreguntas(preguntas).then((res) => {
      const {diagnostico} = res.data;
      dispatch({type: SET_PROPIEDAD_USER, payload: diagnostico});
    });
  }

  function postPregunta(pregunta) {
    const {idPregunta, respuesta} = pregunta;
    RespuestasService.postRespuesta(idPregunta, respuesta).then((res) => {
      const {idRespuesta} = res.data.respuesta;
      dispatch({type: RESPUESTA_RECIBIDA, payload: idRespuesta});
    });
  }

  function postRespuestaCognicion(idRespuesta, idPreguntaCognicion) {
    RespuestasService.postRespuestaCognicion(idRespuesta, idPreguntaCognicion);
  }

  function postDiagnostico(idTipoPregunta) {
    DiagnosticosService.postDiagnostico(idTipoPregunta).then((res) => {
      const {idDiagnostico} = res.data.diagnostico;
      dispatch({type: SET_DIAGNOSTICO, payload: idDiagnostico});
    });
  }

  const setRespuestaPregunta = (idPregunta, respuesta) => {
    console.log(idPregunta, respuesta);
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

  const setPreguntaNo = (index) => {
    dispatch({type: SET_PREGUNTA_NO, payload: index});
  };

  const setPreguntaSi = (index) => {
    dispatch({type: SET_PREGUNTA_SI, payload: index});
  };

  const setRespuestaPreguntaNo = (idPregunta, respuesta) => {
    dispatch({
      type: SET_RESPUESTA_PREGUNTA_NO,
      payload: {idPregunta, respuesta},
    });
  };

  const setRespuestaPreguntaSi = (idPregunta, respuesta) => {
    dispatch({
      type: SET_RESPUESTA_PREGUNTA_SI,
      payload: {idPregunta, respuesta},
    });
  };

  const getDiagnostico = (idDiagnostico) => {
    DiagnosticosService.getDiagnostico(idDiagnostico).then((res) => {
      const {diagnostico} = res.data;
      dispatch({type: DIAGNOSTICO_RECIBIDO, payload: diagnostico});
    });
  };

  return (
    <PreguntasContext.Provider
      value={{
        ...state,
        popPegunta,
        getPregunta,
        postPregunta,
        getCognicion,
        pushPregunta,
        getPreguntas,
        postCognicion,
        postPreguntas,
        setPreguntaNo,
        setPreguntaSi,
        getDiagnostico,
        postDiagnostico,
        getTiposPregunta,
        setRespuestaPregunta,
        setPreguntaCognicion,
        setPropiedadCognicion,
        setRespuestaPreguntaSi,
        postRespuestaCognicion,
        setRespuestaPreguntaNo,
      }}>
      {children}
    </PreguntasContext.Provider>
  );
};
