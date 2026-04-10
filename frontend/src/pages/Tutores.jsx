import { useCallback, useEffect, useState } from "react";
import { api } from "../api.js";

const empty = { nome: "", cpf: "", telefone: "", endereco: "" };

export default function Tutores() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setErr(null);
    try {
      const data = await api.tutores.list();
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

  function startEdit(t) {
    setEditingId(t.id);
    setForm({
      nome: t.nome ?? "",
      cpf: t.cpf ?? "",
      telefone: t.telefone ?? "",
      endereco: t.endereco ?? "",
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
    try {
      if (editingId) {
        await api.tutores.update(editingId, form);
        setMsg("Tutor atualizado.");
        cancelEdit();
      } else {
        await api.tutores.create(form);
        setMsg("Tutor cadastrado.");
        setForm(empty);
      }
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Excluir este tutor?")) return;
    setErr(null);
    try {
      await api.tutores.remove(id);
      setMsg("Tutor removido.");
      if (editingId === id) cancelEdit();
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <>
      <h1 className="page-title">Tutores</h1>
      <p className="page-desc">Nome e CPF são obrigatórios.</p>
      {err && <div className="alert alert-error">{err}</div>}
      {msg && <div className="alert alert-success">{msg}</div>}

      <div className="card">
        <h2>{editingId ? "Editar tutor" : "Novo tutor"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="t-nome">Nome</label>
              <input
                id="t-nome"
                value={form.nome}
                onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="t-cpf">CPF</label>
              <input
                id="t-cpf"
                value={form.cpf}
                onChange={(e) => setForm((f) => ({ ...f, cpf: e.target.value }))}
                required
                maxLength={11}
              />
            </div>
            <div className="form-field">
              <label htmlFor="t-tel">Telefone</label>
              <input
                id="t-tel"
                value={form.telefone}
                onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
              />
            </div>
            <div className="form-field">
              <label htmlFor="t-end">Endereço</label>
              <input
                id="t-end"
                value={form.endereco}
                onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))}
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
          <p className="empty">Nenhum tutor cadastrado.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Endereço</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.nome}</td>
                    <td>{t.cpf}</td>
                    <td>{t.telefone ?? "—"}</td>
                    <td>{t.endereco ?? "—"}</td>
                    <td>
                      <div className="actions">
                        <button type="button" className="btn btn-ghost" onClick={() => startEdit(t)}>
                          Editar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(t.id)}>
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
