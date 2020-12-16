import React, {createContext, useReducer} from 'react';
import EspaciosReducer from '../reducers/EspaciosReducer';
import EspaciosService from '../services/EspaciosService';
import {ESPACIOS_RECIBIDOS, SET_ESPACIO} from '../types';

const initialState = {
  espacios: null,
};

export const EspaciosContext = createContext(initialState);

export const EspaciosProvider = ({children}) => {
  const [state, dispatch] = useReducer(EspaciosReducer, initialState);

  const getEspaciosExperto = ({idExperto}) => {
    EspaciosService.getEspaciosExperto(idExperto).then((res) => {
      const {espacios} = res.data;
      dispatch({type: ESPACIOS_RECIBIDOS, payload: espacios});
    });
  };

  const setEspacio = (espacio) => {
    dispatch({type: SET_ESPACIO, payload: espacio});
  };

  return (
    <EspaciosContext.Provider
      value={{...state, setEspacio, getEspaciosExperto}}>
      {children}
    </EspaciosContext.Provider>
  );
};
