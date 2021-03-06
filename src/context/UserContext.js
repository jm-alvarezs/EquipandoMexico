import React, {createContext, useReducer} from 'react';
import AuthService from '../services/AuthService';
import UsuarioService from '../services/UsuarioService';
import AdjuntosService from '../services/AdjuntosService';
import UserReducer from '../reducers/UserReducer';
import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  LOGIN,
  LOGOUT,
  SET_PROPIEDAD_LOGIN,
  SET_PROPIEDAD_USER,
  USER_CREATED,
  GUARDAR_USUARIO,
  EDITAR_USUARIO,
  CONFIRM_RECIBIDO,
  HIJO_CREATED,
} from '../types';
import {displayError, displaySuccess} from '../utils';
import moment from 'moment';

const initialState = {
  user: null,
  correo: null,
  password: null,
  telefono: null,
  cuenta: null,
  direccion: null,
  hijoCreated: null,
  spinner: false,
  error: null,
  success: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  function signIn(email, password) {
    dispatch({type: SHOW_SPINNER});
    AuthService.signIn(email, password)
      .then(() => {
        UsuarioService.getUsuario()
          .then((res) => {
            let {usuario} = res.data;
            dispatch({
              type: LOGIN,
              payload: usuario,
            });
            dispatch({type: HIDE_SPINNER});
          })
          .catch((error) => {
            displayError(dispatch, error);
            AuthService.signOut();
          });
      })
      .catch((error) => {
        displayError(dispatch, error);
        dispatch({type: HIDE_SPINNER});
      });
  }

  function userLoggedIn() {
    dispatch({type: SHOW_SPINNER});
    AuthService.userLoggedIn(
      () => {
        UsuarioService.getUsuario()
          .then((res) => {
            let {usuario} = res.data;
            dispatch({
              type: LOGIN,
              payload: usuario,
            });
            dispatch({type: HIDE_SPINNER});
          })
          .catch((error) => {
            displayError(dispatch, error);
            AuthService.signOut();
          });
      },
      (error) => {
        displayError(dispatch, error);
        AuthService.signOut();
        dispatch({type: HIDE_SPINNER});
      },
    );
  }

  function signOut() {
    AuthService.signOut()
      .then(() => dispatch({type: LOGOUT}))
      .catch((error) => {
        displayError(dispatch, error);
      });
  }

  function signUp(nombre, correo, password, telefono) {
    dispatch({type: SHOW_SPINNER});
    if (String(telefono).length !== 10) {
      return displayError(dispatch, 'El teléfono debe tener 10 dígitos');
    }
    AuthService.signUp(correo, password)
      .then((user) => {
        const {uid} = user.user;
        dispatch({
          type: SET_PROPIEDAD_LOGIN,
          payload: {key: 'correo', value: correo},
        });
        dispatch({
          type: SET_PROPIEDAD_LOGIN,
          payload: {key: 'password', value: password},
        });
        dispatch({type: HIDE_SPINNER});
        dispatch({type: USER_CREATED});
        UsuarioService.postUsuario(uid, nombre, correo, telefono)
          .then((res) => {
            dispatch({
              type: SET_PROPIEDAD_LOGIN,
              payload: {key: 'correo', value: correo},
            });
            dispatch({
              type: SET_PROPIEDAD_LOGIN,
              payload: {key: 'password', value: password},
            });
            dispatch({type: HIDE_SPINNER});
            dispatch({type: USER_CREATED});
            displaySuccess(dispatch, '¡Registrado con éxito!');
          })
          .catch((error) => {
            displayError(dispatch, error);
          });
      })
      .catch((error) => {
        dispatch({type: HIDE_SPINNER});
        if (error.code) {
          if (error.code === 'auth/email-already-in-use') {
            displayError(dispatch, 'Ya existe una cuenta con ese correo.');
          }
        } else if (error.response) {
          if (error.response.status === 409)
            displayError(
              dispatch,
              'Ya existe un usuario con este correo electrónico.',
            );
          if (error.response.status === 400)
            displayError(dispatch, 'El correo electrónico no es válido.');
        } else {
          displayError(dispatch, error);
        }
      });
  }

  function signInPhone(phone) {
    dispatch({type: SHOW_SPINNER});
    AuthService.signInPhone(phone)
      .then((confirmation) => {
        dispatch({type: CONFIRM_RECIBIDO, payload: confirmation});
      })
      .catch(() => {
        dispatch({type: HIDE_SPINNER});
      });
  }

  function editarUsuario() {
    dispatch({type: EDITAR_USUARIO});
  }

  function cancelEdit() {
    dispatch({type: GUARDAR_USUARIO});
  }

  function setPropiedadUser(key, value) {
    if (key === 'idAdjunto') {
      dispatch({type: SET_PROPIEDAD_USER, payload: {key: 'file', value}});
      if (!value) dispatch({type: SET_PROPIEDAD_USER, payload: {key, value}});
    } else {
      dispatch({type: SET_PROPIEDAD_USER, payload: {key, value}});
    }
  }

  function recoverPassword(email) {
    AuthService.recoverPassword(email)
      .then(() => {
        displaySuccess(
          dispatch,
          'Te hemos enviado un correo para reestablecer tu contraseña.',
        );
      })
      .catch((error) => {
        displayError(
          dispatch,
          'Hubo un error al enviar el correo. Inténtalo más tarde.',
        );
      });
  }

  function updateUsuario(usuario) {
    let valid = true;
    ['nombre', 'correo', 'telefono'].forEach((key) => {
      if (usuario[key] === '' || usuario[key] === null || !usuario[key]) {
        valid = false;
      }
    });
    if (!valid) return displayError(dispatch, 'Debes llenar todos tus datos.');
    if (
      (usuario.idAdjunto === null || !usuario.idAdjunto) &&
      (!usuario.file || usuario.file === null)
    ) {
      return displayError(dispatch, 'Debes agregar una fotografía.');
    }
    const promises = [];
    if (usuario.file && usuario.file !== null) {
      if (usuario.file.name) {
        const promiseAdjunto = new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('adjunto', usuario.file);
          AdjuntosService.postAdjunto(formData).then((res) => {
            const {idAdjunto} = res.data;
            usuario.idAdjunto = idAdjunto;
            resolve();
          });
        });
        promises.push(promiseAdjunto);
      }
    }
    Promise.all(promises).then(() => {
      const data = {...usuario};
      delete data.file;
      delete data.uid;
      delete data.activo;
      AuthService.updateEmail(data.correo)
        .then(() => {
          UsuarioService.putUsuario(data)
            .then((res) => {
              dispatch({type: GUARDAR_USUARIO});
              displaySuccess(dispatch, 'Perfil actualizado con éxito.');
            })
            .catch((error) => {
              displayError(dispatch, error);
            });
        })
        .catch((error) => {
          if (error.code) {
            if (error.code === 'auth/email-already-in-use') {
              displayError(dispatch, 'Ya existe una cuenta con ese correo.');
            }
          }
        });
    });
  }

  function getUsuario() {
    UsuarioService.getUsuario().then((res) => {
      const {usuario} = res.data;
      dispatch({type: LOGIN, payload: usuario});
    });
  }

  function postHijo(nombre, fecha, sexo) {
    UsuarioService.postHijo({nombre, fecha, sexo}).then(() => {
      dispatch({type: HIJO_CREATED});
    });
  }

  function updateHijo(hijo) {
    UsuarioService.putHijo({...hijo, nombre: hijo.nombre_hijo});
  }

  function showSpinner() {
    dispatch({type: SHOW_SPINNER});
  }

  function hideSpinner() {
    dispatch({type: HIDE_SPINNER});
  }

  function showError(error) {
    displayError(dispatch, error);
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        postHijo,
        showError,
        getUsuario,
        cancelEdit,
        updateHijo,
        signInPhone,
        showSpinner,
        hideSpinner,
        userLoggedIn,
        updateUsuario,
        editarUsuario,
        recoverPassword,
        setPropiedadUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
