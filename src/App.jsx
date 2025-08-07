import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Buscar from './pages/Search'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'
import Perfil from './pages/user/Perfil'
import EditarPerfil from './pages/user/EditarPerfil'
import PrivateRouteAdmin from './components/PrivateRouteAdmin'
import AdminDashboard from './pages/admin/Dashboard';
import EventoDetalhes from './pages/EventoDetalhes';
import CadastroEvento from './pages/admin/CadastroEvento';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './components/AuthContext';



function App() {
  const [eventos, setEventos] = useState([]);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost/Tickets/backend/listar_eventos.php")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((error) => console.error("Erro ao buscar eventos:", error));
  }, []);
  return (

    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home eventos={eventos} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editarperfil" element={<EditarPerfil />} />
        <Route path="/admin/dashboard" element={
          <PrivateRouteAdmin>
            <AdminDashboard />
          </PrivateRouteAdmin>
        } />
        <Route path="/evento/:id" element={<EventoDetalhes />} />

        <Route
          path="/admin/cadastrar-evento"
          element={usuario?.tipo === 'admin' ? <CadastroEvento /> : <Navigate to="/login" />}
        />




      </Routes>

      <Footer />

    </BrowserRouter>

  )
}

export default App;
