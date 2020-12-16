import React, {createContext, useReducer} from 'react';
import ContenidosReducer from '../reducers/ContenidosReducer';
import AdjuntosService from '../services/AdjuntosService';
import ContenidosService from '../services/ContenidosService';
import {
  CONTENIDOS_RECIBIDOS,
  SET_CONTENIDO,
  SHOW_SPINNER,
  USER_CREATED,
} from '../types';

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
    dispatch({type: SET_CONTENIDO, payload: idContenido});
  };

  const postContenido = (contenido) => {
    dispatch({type: SHOW_SPINNER});
    if (isNaN(contenido.idContenido)) {
      if (contenido.file && contenido.file !== null) {
        const formData = new FormData();
        formData.append('adjunto', contenido.file);
        AdjuntosService.postAdjunto(formData).then((res) => {
          const {idAdjunto} = res.data;
          let data = {
            nombre: contenido.titulo,
            descripcion: contenido.contenido,
            idAdjunto,
            tipo: contenido.tipo,
            enlace: contenido.enlace,
          };
          ContenidosService.postContenido(data).then(() => {
            dispatch({type: USER_CREATED});
          });
        });
      } else {
        let data = {
          nombre: contenido.titulo,
          descripcion: contenido.contenido,
          idAdjunto,
          tipo: contenido.tipo,
          enlace: contenido.enlace,
        };
        ContenidosService.postContenido(contenido).then(() => {
          dispatch({type: USER_CREATED});
        });
      }
    } else {
      if (contenido.file && contenido.file !== null) {
        const formData = new FormData();
        formData.append('adjunto', contenido.file);
        AdjuntosService.postAdjunto(formData).then((res) => {
          const {idAdjunto} = res.data;
          contenido.idAdjunto = idAdjunto;
          let data = {
            nombre: contenido.titulo,
            descripcion: contenido.contenido,
            idAdjunto,
            tipo: contenido.tipo,
            enlace: contenido.enlace,
          };
          delete contenido.file;
          ContenidosService.putContenido(data);
        });
      } else {
        let data = {
          nombre: contenido.titulo,
          descripcion: contenido.contenido,
          idAdjunto,
          tipo: contenido.tipo,
          enlace: contenido.enlace,
        };
        ContenidosService.putContenido(contenido);
      }
    }
  };

  return (
    <ContenidosContext.Provider
      value={{...state, getContenido, getContenidos, postContenido}}>
      {children}
    </ContenidosContext.Provider>
  );
};
