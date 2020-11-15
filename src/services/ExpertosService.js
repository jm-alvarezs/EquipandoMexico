import api from './api';

const route = '/expertos';

export default {
  getExpertos: () => api.get(route),
  getExperto: (idExperto) => api.get(`${route}/${idExperto}`),
};
