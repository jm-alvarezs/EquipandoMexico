import React, {createContext, useReducer} from 'react';
import AnaliticasReducer from '../reducers/AnaliticasReducer';
import AnaliticasService from '../services/AnaliticasService';
import {
  CITAS_RECIBIDAS,
  USUARIOS_RECIBIDOS,
  USUARIOS_DIA_RECIBIDOS,
} from '../types';
import moment from 'moment';

const initialState = {
  usuarios: null,
  usuariosdia: null,
  citas: null,
};

export const AnaliticasContext = createContext(initialState);

export const AnaliticasProvider = ({children}) => {
  const [state, dispatch] = useReducer(AnaliticasReducer, initialState);

  const getUsuarios = () => {
    AnaliticasService.getUsuarios().then((res) => {
      const {usuarios} = res.data;
      dispatch({type: USUARIOS_RECIBIDOS, payload: usuarios.usuarios});
    });
    let fecha_fin = moment();
    let fecha_inicio = moment().subtract(1, 'month');
    fecha_fin = fecha_fin.format('YYYY-MM-DD');
    fecha_inicio = fecha_inicio.format('YYYY-MM-DD');
    AnaliticasService.getUsuariosDia(fecha_inicio, fecha_fin).then((res) => {
      const {usuarios} = res.data;
      dispatch({type: USUARIOS_DIA_RECIBIDOS, payload: usuarios});
    });
  };

  const getCitas = () => {
    AnaliticasService.getCitas().then((res) => {
      const {citas} = res.data;
      dispatch({type: CITAS_RECIBIDAS, payload: citas});
    });
  };
  return (
    <AnaliticasContext.Provider value={{...state, getUsuarios, getCitas}}>
      {children}
    </AnaliticasContext.Provider>
  );
};
