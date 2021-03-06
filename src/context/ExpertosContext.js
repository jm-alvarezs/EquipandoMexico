import React, {createContext, useReducer} from 'react';
import ExpertosReducer from '../reducers/ExpertosReducer';
import AdjuntosService from '../services/AdjuntosService';
import ExpertosService from '../services/ExpertosService';
import {
  EXPERTOS_RECIBIDOS,
  SET_EXPERTO,
  SHOW_SPINNER,
  USER_CREATED,
} from '../types';

const initialState = {
  expertos: null,
  experto: null,
};

export const ExpertosContext = createContext(initialState);

export const ExpertosProvider = ({children}) => {
  const [state, dispatch] = useReducer(ExpertosReducer, initialState);

  const getExpertos = (latitude, longitude) => {
    ExpertosService.getExpertos(latitude, longitude).then((res) => {
      const {expertos} = res.data;
      dispatch({type: EXPERTOS_RECIBIDOS, payload: expertos});
    });
  };

  const getExperto = ({idExperto}) => {
    ExpertosService.getExperto(idExperto).then((res) => {
      const {experto} = res.data;
      dispatch({type: SET_EXPERTO, payload: experto});
    });
  };

  const postExperto = (experto) => {
    dispatch({type: SHOW_SPINNER});
    if (experto.file && experto.file !== null) {
      const formData = new FormData();
      formData.append('adjunto', experto.file);
      AdjuntosService.postAdjunto(formData).then((res) => {
        const {idAdjunto} = res.data;
        experto.idAdjunto = idAdjunto;
        let data = {...experto, ...experto.direccion};
        delete data.file;
        ExpertosService.postExperto(data).then(() => {
          dispatch({type: USER_CREATED});
        });
      });
    } else {
      ExpertosService.postExperto({...experto, ...experto.direccion}).then(
        () => {
          dispatch({type: USER_CREATED});
        },
      );
    }
  };

  return (
    <ExpertosContext.Provider
      value={{...state, getExperto, getExpertos, postExperto}}>
      {children}
    </ExpertosContext.Provider>
  );
};
