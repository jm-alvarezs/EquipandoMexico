import api from './api';

const route = '/diagnosticos';

export default {
  getDiagnostico: (idDiagnostico) =>
    api.get(`${route}/realizado/${idDiagnostico}`),
  getUltimoDiagnostico: (idTipoPregunta) =>
    api.get(`${route}/ultimo/${idTipoPregunta}`),
  postDiagnostico: (idTipoPregunta) => api.post(route, {idTipoPregunta}),
};
