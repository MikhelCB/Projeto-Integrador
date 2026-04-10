import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Tutores from "./pages/Tutores.jsx";
import Animais from "./pages/Animais.jsx";
import Servicos from "./pages/Servicos.jsx";
import Agendamentos from "./pages/Agendamentos.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tutores" element={<Tutores />} />
        <Route path="animais" element={<Animais />} />
        <Route path="servicos" element={<Servicos />} />
        <Route path="agendamentos" element={<Agendamentos />} />
      </Route>
    </Routes>
  );
}
