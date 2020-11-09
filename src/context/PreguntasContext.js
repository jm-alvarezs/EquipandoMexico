import React, {createContext, useReducer} from 'react';
import PreguntasReducer from '../reducers/PreguntasReducer';
import {PREGUNTAS_RECIBIDAS, SET_PREGUNTA} from '../types';

const initialState = {
  preguntas: null,
  pregunta: null,
};

const preguntas = [
  {
    idPregunta: 1,
    orden: 1,
    texto: '¿Cómo manejarías esta situación',
    descripcion:
      'Estás en un parque y se te acerca un extraño.  Te invita a seguirlo. ¿Vas con él?',
  },
];

export const PreguntasContext = createContext(initialState);

export const PreguntasProvider = ({children}) => {
  const [state, dispatch] = useReducer(PreguntasReducer, initialState);

  function getPreguntas() {
    dispatch({type: PREGUNTAS_RECIBIDAS, payload: preguntas});
  }

  function getPregunta(numero) {
    dispatch({type: SET_PREGUNTA, payload: numero});
  }

  return (
    <PreguntasContext.Provider value={{...state, getPregunta, getPreguntas}}>
      {children}
    </PreguntasContext.Provider>
  );
};
