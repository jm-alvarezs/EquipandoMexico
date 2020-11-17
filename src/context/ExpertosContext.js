import React, {createContext, useReducer} from 'react';
import ExpertosReducer from '../reducers/ExpertosReducer';
import ExpertosService from '../services/ExpertosService';
import {EXPERTOS_RECIBIDOS, SET_EXPERTO} from '../types';

const initialState = {
  expertos: null,
  experto: null,
};

export const ExpertosContext = createContext(initialState);

export const ExpertosProvider = ({children}) => {
  const [state, dispatch] = useReducer(ExpertosReducer, initialState);

  const getExpertos = () => {
    ExpertosService.getExpertos().then((res) => {
      const {expertos} = res.data;
      dispatch({type: EXPERTOS_RECIBIDOS, payload: expertos});
    });
  };

  const getExperto = (idExperto) => {
    ExpertosService.getExperto(idExperto).then((res) => {
      const {experto} = res.data;
      dispatch({type: SET_EXPERTO, payload: experto});
    });
  };

  const postExperto = (experto) => {
    ExpertosService.postExperto(experto);
  };

  return (
    <ExpertosContext.Provider
      value={{...state, getExperto, getExpertos, postExperto}}>
      {children}
    </ExpertosContext.Provider>
  );
};
