import api from './api';

const route = '/admin';

export default {
  getUsuarios: () => api.get(`${route}/totalusuarios`),
  getUsuariosDia: (fecha_inicio, fecha_fin) =>
    api.get(
      `${route}/totalusuariospordia?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`,
    ),
  getCitas: () => api.get(`${route}/totalcitasexperto`),
};
