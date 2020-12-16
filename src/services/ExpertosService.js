import api from './api';

const route = '/expertos';

export default {
  getExpertos: (lat, lng) => api.get(`${route}?lat=${lat}&lng=${lng}`),
  getExperto: (idExperto) => api.get(`${route}/${idExperto}`),
  postExperto: (experto) => api.post(route, {...experto}),
  deleteExperto: (idExperto) => api.delete(`${route}/${idExperto}`),
};
