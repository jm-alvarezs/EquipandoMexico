import {CITAS_RECIBIDAS, SET_CITA, SET_PROPIEDAD_CITA} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case CITAS_RECIBIDAS:
      return {...state, citas: payload};
    case SET_CITA:
      return {...state, cita: payload};
    case SET_PROPIEDAD_CITA:
      const cita = {...state.cita};
      const {key, value} = payload;
      cita[key] = value;
      return {...state, cita};
    default:
      return state;
  }
};
