import {
  LOGIN,
  LOGOUT,
  SHOW_SPINNER,
  HIDE_SPINNER,
  USER_CREATED,
  SHOW_ALERT,
  SET_PROPIEDAD_USER,
  SET_PROPIEDAD_LOGIN,
  CONFIRM_RECIBIDO,
  HIJO_CREATED,
  CLEAR_ALERT,
  SHOW_SUCCESS,
  CLEAR_SUCCESS,
} from '../types';

export default (state, {type, payload}) => {
  switch (type) {
    case LOGIN:
      const user = payload;
      return {...state, user};
    case LOGOUT:
      return {...state, user: null};
    case SHOW_SPINNER:
      return {...state, spinner: true};
    case HIDE_SPINNER:
      return {...state, spinner: false};
    case USER_CREATED:
      return {...state, created: true};
    case SHOW_ALERT:
      return {...state, error: payload};
    case SET_PROPIEDAD_USER: {
      const {key, value} = payload;
      const user = {...state.user};
      user[key] = value;
      return {...state, user};
    }
    case SET_PROPIEDAD_LOGIN:
      const {key, value} = payload;
      return {...state, [key]: value};
    case CONFIRM_RECIBIDO:
      return {...state, confirmation: payload};
    case HIJO_CREATED: {
      return {...state, hijoCreated: true};
    }
    case SHOW_ALERT:
      return {...state, error: payload};
    case CLEAR_ALERT:
      return {...state, error: null};
    case SHOW_SUCCESS:
      return {...state, success: payload};
    case CLEAR_SUCCESS:
      return {...state, success: null};
    default:
      return {...state};
  }
};
