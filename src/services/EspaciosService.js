import api from './api';

const route = '/espacios';

export default {
  getEspaciosExperto: (idExperto) => api.get(`${route}/${idExperto}`),
};
