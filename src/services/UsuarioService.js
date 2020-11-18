import api from './api';

const route = '/usuarios';

export default {
  getUsuario: () => api.get('/usuario'),
  postUsuario: (uid, nombre, correo, telefono) =>
    api.post('/signup', {uid, nombre, correo, telefono}),
  putUsuario: (usuario) => api.put(route, {...usuario}),
  postHijo: (hijo) => api.post(`${route}/hijo`, {...hijo}),
  updateCorreo: (correo) => api.put(`${route}/correo`, {correo}),
  setToken: (token) => (api.defaults.headers.common['Authorization'] = token),
};
