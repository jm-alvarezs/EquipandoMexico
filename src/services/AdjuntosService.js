import api from "./api";

const route = "/adjuntos";

export default {
  postAdjunto: formData =>
    api.post(route, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),
  duplicarAdjunto: idAdjunto => api.post(`${route}/${idAdjunto}/duplicar`),
  getAdjunto: idAdjunto => api.get(`${route}/${idAdjunto}`, {
    responseType: "arraybuffer"
  })
};
