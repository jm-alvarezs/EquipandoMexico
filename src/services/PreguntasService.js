import api from './api';

const route = '/preguntas';

export default {
  getTiposPregunta: () => api.get(`${route}/tipos`),
  getPreguntas: (idTipoPregunta) =>
    api.get(`${route}/tipopregunta/${idTipoPregunta}`),
  getCognicion: (idPregunta) => api.get(`${route}/cognicion/${idPregunta}`),
  postPreguntas: (preguntas) => api.post(route, {preguntas}),
};
