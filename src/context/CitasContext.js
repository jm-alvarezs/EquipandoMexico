import React, {createContext, useReducer} from 'react';
import CitasReducer from '../reducers/CitasReducer';
import CitasService from '../services/CitasService';
import {CITAS_RECIBIDAS, SET_CITA, SET_PROPIEDAD_CITA} from '../types';

const initialState = {
  citas: null,
  cita: null,
};

export const CitasContext = createContext(initialState);

export const CitasProvider = ({children}) => {
  const [state, dispatch] = useReducer(CitasReducer, initialState);

  const getMisCitas = () => {
    CitasService.getMisCitas().then((res) => {
      const {citas} = res.data;
      dispatch({type: CITAS_RECIBIDAS, payload: citas});
    });
  };

  const getCita = (idCita) => {
    CitasService.getCita(idCita).then((res) => {
      const {cita} = res.data;
      dispatch({type: SET_CITA, payload: cita});
    });
  };

  const postCita = (cita) => {
    CitasService.postCita(cita);
  };

  const updateCita = (cita) => {
    CitasService.updateCita(cita);
  };

  const setPropiedadCita = (key, value) => {
    dispatch({tyoe: SET_PROPIEDAD_CITA, payload: {key, value}});
  };

  const deleteCita = (cita) => {
    const {idCita} = cita;
    CitasService.deleteCita(idCita);
  };

  return (
    <CitasContext.Provider
      value={{
        ...state,
        getCita,
        getMisCitas,
        postCita,
        updateCita,
        deleteCita,
        setPropiedadCita,
      }}>
      {children}
    </CitasContext.Provider>
  );
};
