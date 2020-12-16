import api from './api';

const route = '/citas';

export default {
  getMisCitas: () => api.get(route),
  getCita: (idCita) => api.get(`${route}/${idCita}`),
  postCita: (idEspacio) => api.post(route, {idEspacio}),
  updateCita: (cita) => api.put(route, {...cita}),
  deleteCita: (idCita) => api.delete(`${route}/${idCita}`),
};
