import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home-hero">
        <h1>Bem-vindo ao painel</h1>
        <p>
          Gerencie tutores, animais, serviços e agendamentos da clínica. Mantenha o backend rodando em{" "}
          <code style={{ opacity: 0.95 }}>localhost:3000</code> ao usar o app em desenvolvimento.
        </p>
      </div>
      <div className="home-cards">
        <Link to="/tutores" className="home-card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3>Tutores</h3>
          <p>Cadastro e edição de responsáveis pelos pets.</p>
        </Link>
        <Link to="/animais" className="home-card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3>Animais</h3>
          <p>Pets vinculados a um tutor.</p>
        </Link>
        <Link to="/servicos" className="home-card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3>Serviços</h3>
          <p>Tipos de atendimento oferecidos.</p>
        </Link>
        <Link
          to="/agendamentos"
          className="home-card"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3>Agendamentos</h3>
          <p>Marque consultas respeitando tutor e horário.</p>
        </Link>
      </div>
    </>
  );
}
