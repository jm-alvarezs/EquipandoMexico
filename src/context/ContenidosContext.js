import React, {createContext, useReducer} from 'react';
import ContenidosReducer from '../reducers/ContenidosReducer';
import ContenidosService from '../services/ContenidosService';
import {CONTENIDOS_RECIBIDOS, SET_CONTENIDO} from '../types';

const initialState = {
  contenidos: null,
  contenido: null,
};

export const ContenidosContext = createContext(initialState);

export const ContenidosProvider = ({children}) => {
  const [state, dispatch] = useReducer(ContenidosReducer, initialState);

  const getContenidos = () => {
    ContenidosService.getContenidos().then((res) => {
      const {contenidos} = res.data;
      dispatch({type: CONTENIDOS_RECIBIDOS, payload: contenidos});
    });
  };

  const getContenido = (idContenido) => {
    ContenidosService.getContenido(idContenido).then((res) => {
      const {contenido} = res.data;
      dispatch({type: SET_CONTENIDO, payload: contenido});
    });
  };

  const postContenido = (contenido) => {
    ContenidosService.postContenido(contenido);
  };

  return (
    <ContenidosContext.Provider
      value={{...state, getContenido, getContenidos, postContenido}}>
      {children}
    </ContenidosContext.Provider>
  );
};
