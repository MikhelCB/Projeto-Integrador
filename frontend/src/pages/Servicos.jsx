import { useCallback, useEffect, useState } from "react";
import { api } from "../api.js";

const empty = { tp_servico: "" };

export default function Servicos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setErr(null);
    try {
      const data = await api.servicos.list();
      setItems(Array.isArray(data) ? data : []);
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

  function startEdit(s) {
    setEditingId(s.id);
    setForm({ tp_servico: s.tp_servico ?? "" });
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
    const body = { tp_servico: form.tp_servico.trim() };
    try {
      if (editingId) {
        await api.servicos.update(editingId, body);
        setMsg("Serviço atualizado.");
        cancelEdit();
      } else {
        await api.servicos.create(body);
        setMsg("Serviço cadastrado.");
        setForm(empty);
      }
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Excluir este serviço?")) return;
    setErr(null);
    try {
      await api.servicos.remove(id);
      setMsg("Serviço removido.");
      if (editingId === id) cancelEdit();
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <>
      <h1 className="page-title">Serviços</h1>
      <p className="page-desc">Cadastre o tipo de serviço oferecido (ex.: consulta, vacina).</p>
      {err && <div className="alert alert-error">{err}</div>}
      {msg && <div className="alert alert-success">{msg}</div>}

      <div className="card">
        <h2>{editingId ? "Editar serviço" : "Novo serviço"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field" style={{ gridColumn: "1 / -1", maxWidth: "420px" }}>
              <label htmlFor="s-tp">Tipo de serviço</label>
              <input
                id="s-tp"
                value={form.tp_servico}
                onChange={(e) => setForm({ tp_servico: e.target.value })}
                required
              />
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
          <p className="empty">Nenhum serviço cadastrado.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.tp_servico}</td>
                    <td>
                      <div className="actions">
                        <button type="button" className="btn btn-ghost" onClick={() => startEdit(s)}>
                          Editar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(s.id)}>
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
