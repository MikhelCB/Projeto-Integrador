import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/tutores", label: "Tutores" },
  { to: "/animais", label: "Animais" },
  { to: "/servicos", label: "Serviços" },
  { to: "/agendamentos", label: "Agendamentos" },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">Clínica Veterinária</div>
        <nav>
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? "active" : "")}>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
