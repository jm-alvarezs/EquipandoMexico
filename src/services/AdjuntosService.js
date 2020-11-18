import api from './api';

const route = '/adjuntos';

export default {
  postAdjunto: (formData) =>
    api.post(route, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getAdjunto: (idAdjunto) =>
    api.get(`${route}/${idAdjunto}`, {
      responseType: 'arraybuffer',
    }),
};
