import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Buscar from './pages/Search'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
