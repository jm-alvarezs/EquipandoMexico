import api from './api';

const route = '/preguntas';

export default {
  getPreguntas: () => api.get(route),
  postPreguntas: (preguntas) => api.post(route, {preguntas}),
};
