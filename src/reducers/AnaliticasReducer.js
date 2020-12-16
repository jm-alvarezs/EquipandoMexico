import {
  CITAS_RECIBIDAS,
  USUARIOS_DIA_RECIBIDOS,
  USUARIOS_RECIBIDOS,
} from '../types';
export default (state, {type, payload}) => {
  switch (type) {
    case USUARIOS_RECIBIDOS:
      return {...state, usuarios: payload};
    case USUARIOS_DIA_RECIBIDOS:
      return {...state, usuariosdia: payload};
    case CITAS_RECIBIDAS:
      return {...state, citas: payload};
    default:
      return state;
  }
};
