import { useCallback, useEffect, useState } from "react";
import { api } from "../api.js";

const empty = { nome: "", especie: "", raca: "", tutor_id: "" };

export default function Animais() {
  const [items, setItems] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setErr(null);
    try {
      const [animais, t] = await Promise.all([api.animais.list(), api.tutores.list()]);
      setItems(Array.isArray(animais) ? animais : []);
      setTutores(Array.isArray(t) ? t : []);
    } catch (e) {
      setErr(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function tutorNome(id) {
    const x = tutores.find((u) => Number(u.id) === Number(id));
    return x ? x.nome : id;
  }

  function startEdit(a) {
    setEditingId(a.id);
    setForm({
      nome: a.nome ?? "",
      especie: a.especie ?? "",
      raca: a.raca ?? "",
      tutor_id: String(a.tutor_id ?? ""),
    });
    setMsg(null);
    setErr(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(empty);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    const body = {
      nome: form.nome.trim(),
      especie: form.especie.trim(),
      raca: form.raca.trim(),
      tutor_id: Number(form.tutor_id),
    };
    try {
      if (editingId) {
        await api.animais.update(editingId, body);
        setMsg("Animal atualizado.");
        cancelEdit();
      } else {
        await api.animais.create(body);
        setMsg("Animal cadastrado.");
        setForm(empty);
      }
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Excluir este animal?")) return;
    setErr(null);
    try {
      await api.animais.remove(id);
      setMsg("Animal removido.");
      if (editingId === id) cancelEdit();
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <>
      <h1 className="page-title">Animais</h1>
      <p className="page-desc">Nome, espécie, raça e tutor são obrigatórios.</p>
      {err && <div className="alert alert-error">{err}</div>}
      {msg && <div className="alert alert-success">{msg}</div>}

      <div className="card">
        <h2>{editingId ? "Editar animal" : "Novo animal"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="a-nome">Nome</label>
              <input
                id="a-nome"
                value={form.nome}
                onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="a-esp">Espécie</label>
              <input
                id="a-esp"
                value={form.especie}
                onChange={(e) => setForm((f) => ({ ...f, especie: e.target.value }))}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="a-raca">Raça</label>
              <input
                id="a-raca"
                value={form.raca}
                onChange={(e) => setForm((f) => ({ ...f, raca: e.target.value }))}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="a-tutor">Tutor</label>
              <select
                id="a-tutor"
                value={form.tutor_id}
                onChange={(e) => setForm((f) => ({ ...f, tutor_id: e.target.value }))}
                required
              >
                <option value="">Selecione</option>
                {tutores.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome} (id {t.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <div className="actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Salvar" : "Cadastrar"}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-ghost" onClick={cancelEdit}>
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Lista</h2>
        {loading ? (
          <p className="empty">Carregando…</p>
        ) : items.length === 0 ? (
          <p className="empty">Nenhum animal cadastrado.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Espécie</th>
                  <th>Raça</th>
                  <th>Tutor</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.nome}</td>
                    <td>{a.especie}</td>
                    <td>{a.raca}</td>
                    <td>{tutorNome(a.tutor_id)}</td>
                    <td>
                      <div className="actions">
                        <button type="button" className="btn btn-ghost" onClick={() => startEdit(a)}>
                          Editar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(a.id)}>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
