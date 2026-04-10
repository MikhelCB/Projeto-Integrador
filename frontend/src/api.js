const base = import.meta.env.VITE_API_URL ?? "";

async function parseJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function request(path, options = {}) {
  const url = `${base}${path}`;
  const headers = { "Content-Type": "application/json", ...options.headers };
  const res = await fetch(url, { ...options, headers });
  const data = await parseJson(res);
  if (!res.ok) {
    const msg =
      data && typeof data === "object" && data.message
        ? data.message
        : `Erro ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const api = {
  tutores: {
    list: () => request("/tutores"),
    create: (body) => request("/tutores", { method: "POST", body: JSON.stringify(body) }),
    update: (id, body) =>
      request(`/tutores/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    remove: (id) => request(`/tutores/${id}`, { method: "DELETE" }),
  },
  animais: {
    list: () => request("/animais"),
    create: (body) => request("/animais", { method: "POST", body: JSON.stringify(body) }),
    update: (id, body) =>
      request(`/animais/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    remove: (id) => request(`/animais/${id}`, { method: "DELETE" }),
  },
  servicos: {
    list: () => request("/servico"),
    create: (body) => request("/servico", { method: "POST", body: JSON.stringify(body) }),
    update: (id, body) =>
      request(`/servico/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    remove: (id) => request(`/servico/${id}`, { method: "DELETE" }),
  },
  agendamentos: {
    list: () => request("/agendamento"),
    create: (body) =>
      request("/agendamento", { method: "POST", body: JSON.stringify(body) }),
    update: (id, body) =>
      request(`/agendamento/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    remove: (id) => request(`/agendamento/${id}`, { method: "DELETE" }),
  },
};
