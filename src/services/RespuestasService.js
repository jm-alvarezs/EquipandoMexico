import api from './api';

const route = '/respuestas';

export default {
  postRespuesta: (idPregunta, respuesta) =>
    api.post(route, {idPregunta, respuesta}),
  postRespuestaCognicion: (idDiagnostico, idRespuesta, idPreguntaCognicion) =>
    api.post(`${route}/diagnostico`, {
      idDiagnostico,
      idRespuesta,
      idPreguntaCognicion,
    }),
};
