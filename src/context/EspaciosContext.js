import React, {createContext, useReducer} from 'react';
import EspaciosReducer from '../reducers/EspaciosReducer';
import EspaciosService from '../services/EspaciosService';
import {ESPACIOS_RECIBIDOS} from '../types';

const initialState = {
  espacios: null,
};

export const EspaciosContext = createContext(initialState);

export const EspaciosProvider = ({children}) => {
  const [state, dispatch] = useReducer(EspaciosReducer, initialState);

  const getEspaciosExperto = (idExperto) => {
    EspaciosService.getEspaciosExperto(idExperto).then((res) => {
      const {espacios} = res.data;
      dispatch({type: ESPACIOS_RECIBIDOS, payload: espacios});
    });
  };

  return (
    <EspaciosContext.Provider value={{...state, getEspaciosExperto}}>
      {children}
    </EspaciosContext.Provider>
  );
};
