import api from './api';

const route = '/contenidos';

export default {
  getContenidos: (limit, offset) =>
    api.get(`${route}?limit=${limit}&offset=${offset}`),
  getContenido: (idContenido) => api.get(`${route}/${idContenido}`),
};
