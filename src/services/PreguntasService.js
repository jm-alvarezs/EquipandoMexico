import api from './api';

const route = '/preguntas';

export default {
  getTiposPregunta: () => api.get(`${route}/tipos`),
  getPreguntas: (idTipoPregunta) => api.get(`${route}/${idTipoPregunta}`),
  getCognicion: (idPregunta) => api.get(`${route}/${idPregunta}`),
  postPreguntas: (preguntas) => api.post(route, {preguntas}),
};
