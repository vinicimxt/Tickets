import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Buscar from './pages/Search'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'
import Perfil from './pages/Perfil'
import EditarPerfil from './pages/EditarPerfil'
import { AuthProvider } from './components/AuthContext'

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editarperfil" element={<EditarPerfil />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App;
