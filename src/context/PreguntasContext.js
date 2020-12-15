import React, {createContext, useReducer} from 'react';
import PreguntasReducer from '../reducers/PreguntasReducer';
import PreguntasService from '../services/PreguntasService';
import {
  PREGUNTAS_RECIBIDAS,
  SET_PREGUNTA,
  SET_PROPIEDAD_USER,
  SET_RESPUESTA_PREGUNTA,
} from '../types';

const initialState = {
  preguntas: null,
  pregunta: null,
  diagnostico: null,
};

const preguntas = [
  {
    idPregunta: 1,
    orden: 1,
    texto: '¿Cómo manejarías esta situación',
    descripcion:
      'Estás en un parque y se te acerca un extraño.  Te invita a seguirlo. ¿Vas con él?',
    idOpcion: 1,
    siguiente: 2,
    anterior: 1,
    opciones: [
      {
        idOpcion: 1,
        orden: 1,
        texto: '',
        descripcion: '',
      },
      {
        idOpcion: 2,
        orden: 2,
        texto: '',
        descripcion: '',
      },
    ],
  },
];

export const PreguntasContext = createContext(initialState);

export const PreguntasProvider = ({children}) => {
  const [state, dispatch] = useReducer(PreguntasReducer, initialState);

  function getPreguntas() {
    PreguntasService.getPreguntas().then((res) => {
      //const { preguntas } = res.data;
      dispatch({type: PREGUNTAS_RECIBIDAS, payload: preguntas});
    });
  }

  function getPregunta(idPregunta) {
    dispatch({type: SET_PREGUNTA, payload: idPregunta});
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

  return (
    <PreguntasContext.Provider
      value={{
        ...state,
        getPregunta,
        getPreguntas,
        postPreguntas,
        setRespuestaPregunta,
      }}>
      {children}
    </PreguntasContext.Provider>
  );
};
