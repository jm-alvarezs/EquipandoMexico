import api from './api';

const route = '/contenidos';

export default {
  getContenidos: (limit, offset) =>
    api.get(`${route}?limit=${limit}&offset=${offset}`),
  getContenido: (idContenido) => api.get(`${route}/${idContenido}`),
  postContenido: (contenido) => api.post(route, {...contenido}),
  putContenido: (contenido) => api.put(route, {...contenido}),
  deleteContenido: (idContenido) => api.delete(`${route}/${idContenido}`),
};
