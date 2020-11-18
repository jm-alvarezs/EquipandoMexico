import api from './api';

const route = '/expertos';

export default {
  getExpertos: () => api.get(route),
  getExperto: (idExperto) => api.get(`${route}/${idExperto}`),
  postExperto: (experto) => api.post(route, {...experto}),
  deleteExperto: (idExperto) => api.delete(`${route}/${idExperto}`),
};
