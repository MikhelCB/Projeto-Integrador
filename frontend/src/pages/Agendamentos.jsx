import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../api.js";

function formatData(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? String(iso) : d.toLocaleString("pt-BR");
}

const empty = { dataLocal: "", tutor_id: "", animal_id: "", servico_id: "" };

export default function Agendamentos() {
  const [items, setItems] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setErr(null);
    try {
      const [ags, t, a, s] = await Promise.all([
        api.agendamentos.list(),
        api.tutores.list(),
        api.animais.list(),
        api.servicos.list(),
      ]);
      setItems(Array.isArray(ags) ? ags : []);
      setTutores(Array.isArray(t) ? t : []);
      setAnimais(Array.isArray(a) ? a : []);
      setServicos(Array.isArray(s) ? s : []);
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

  const animaisDoTutor = useMemo(() => {
    const tid = form.tutor_id;
    if (!tid) return [];
    return animais.filter((x) => Number(x.tutor_id) === Number(tid));
  }, [animais, form.tutor_id]);

  function nomeTutor(id) {
    const x = tutores.find((u) => Number(u.id) === Number(id));
    return x ? x.nome : id;
  }
  function nomeAnimal(id) {
    const x = animais.find((u) => Number(u.id) === Number(id));
    return x ? x.nome : id;
  }
  function nomeServico(id) {
    const x = servicos.find((u) => Number(u.id) === Number(id));
    return x ? x.tp_servico : id;
  }

  function toDatetimeLocalValue(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const h = pad(d.getHours());
    const min = pad(d.getMinutes());
    return `${y}-${m}-${day}T${h}:${min}`;
  }

  function startEdit(row) {
    setEditingId(row.id);
    setForm({
      dataLocal: toDatetimeLocalValue(row.data),
      tutor_id: String(row.tutor_id ?? ""),
      animal_id: String(row.animal_id ?? ""),
      servico_id: String(row.servico_id ?? ""),
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
    const dataIso = form.dataLocal ? new Date(form.dataLocal).toISOString() : "";
    const body = {
      data: dataIso,
      tutor_id: Number(form.tutor_id),
      animal_id: Number(form.animal_id),
      servico_id: Number(form.servico_id),
    };
    try {
      if (editingId) {
        await api.agendamentos.update(editingId, body);
        setMsg("Agendamento atualizado.");
        cancelEdit();
      } else {
        await api.agendamentos.create(body);
        setMsg("Agendamento criado.");
        setForm(empty);
      }
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Excluir este agendamento?")) return;
    setErr(null);
    try {
      await api.agendamentos.remove(id);
      setMsg("Agendamento removido.");
      if (editingId === id) cancelEdit();
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  }

  return (
    <>
      <h1 className="page-title">Agendamentos</h1>
      <p className="page-desc">
        O animal deve pertencer ao tutor escolhido. Não pode haver outro agendamento no mesmo horário exato.
      </p>
      {err && <div className="alert alert-error">{err}</div>}
      {msg && <div className="alert alert-success">{msg}</div>}

      <div className="card">
        <h2>{editingId ? "Editar agendamento" : "Novo agendamento"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="ag-data">Data e hora</label>
              <input
                id="ag-data"
                type="datetime-local"
                value={form.dataLocal}
                onChange={(e) => setForm((f) => ({ ...f, dataLocal: e.target.value }))}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="ag-tutor">Tutor</label>
              <select
                id="ag-tutor"
                value={form.tutor_id}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    tutor_id: e.target.value,
                    animal_id: "",
                  }))
                }
                required
              >
                <option value="">Selecione</option>
                {tutores.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="ag-animal">Animal</label>
              <select
                id="ag-animal"
                value={form.animal_id}
                onChange={(e) => setForm((f) => ({ ...f, animal_id: e.target.value }))}
                required
                disabled={!form.tutor_id}
              >
                <option value="">{form.tutor_id ? "Selecione" : "Escolha o tutor primeiro"}</option>
                {animaisDoTutor.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="ag-serv">Serviço</label>
              <select
                id="ag-serv"
                value={form.servico_id}
                onChange={(e) => setForm((f) => ({ ...f, servico_id: e.target.value }))}
                required
              >
                <option value="">Selecione</option>
                {servicos.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.tp_servico}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field" style={{ gridColumn: "1 / -1" }}>
              <div className="actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Salvar" : "Agendar"}
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
          <p className="empty">Nenhum agendamento.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Tutor</th>
                  <th>Animal</th>
                  <th>Serviço</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{formatData(row.data)}</td>
                    <td>{nomeTutor(row.tutor_id)}</td>
                    <td>{nomeAnimal(row.animal_id)}</td>
                    <td>{nomeServico(row.servico_id)}</td>
                    <td>
                      <div className="actions">
                        <button type="button" className="btn btn-ghost" onClick={() => startEdit(row)}>
                          Editar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(row.id)}>
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
