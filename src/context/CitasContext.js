import React, {createContext, useReducer} from 'react';
import CitasReducer from '../reducers/CitasReducer';
import CitasService from '../services/CitasService';
import {
  CITAS_RECIBIDAS,
  SET_CITA,
  SET_PROPIEDAD_CITA,
  SHOW_SPINNER,
  USER_CREATED,
} from '../types';

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

  const postCita = (idEspacio) => {
    dispatch({type: SHOW_SPINNER});
    CitasService.postCita(idEspacio).then((res) => {
      const {cita} = res.data;
      dispatch({type: SET_CITA, payload: cita});
      dispatch({type: USER_CREATED});
    });
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

  const setCita = (cita) => {
    dispatch({type: SET_CITA, payload: cita});
  };

  return (
    <CitasContext.Provider
      value={{
        ...state,
        setCita,
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
