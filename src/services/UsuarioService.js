import api from "./api";

const route = "/agentes";

export default {
  getUsuario: () => api.get(route),
  postUsuario: (uid, nombre, correo, telefono) =>
    api.post("/signup", { uid, nombre, correo, telefono }),
  putUsuario: (usuario) => api.put(route, { ...usuario }),
  updateCorreo: (correo) => api.put(`${route}/correo`, { correo }),
  setToken: (token) => (api.defaults.headers.common["Authorization"] = token),
};
