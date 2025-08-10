import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import accessIcon from '../../dist/assets/images/accessIcon.png';

function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserLink = () => {
    if (usuario?.tipo === 'admin') {
      return '/admin/dashboard';
    }
    return '/perfil';
  };

  return (
    <nav className="bg-[#0d0d13] shadow-lg fixed w-full z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">

        {/* Logo + Navegação */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-pink-500 font-bold text-xl flex items-center gap-2">
            <img
              src={accessIcon}
              alt="Softwave Access"
              className="block h-16 w-auto"
            /> <span className="hidden sm:inline">EventHub</span>
          </Link>

          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-gray-300 hover:text-pink-500 transition">Início</Link>
            <Link to="/buscar" className="text-gray-300 hover:text-pink-500 transition">Buscar</Link>
            <Link to="/sobre" className="text-gray-300 hover:text-pink-500 transition">Sobre</Link>
          </div>
        </div>

        {/* Área de usuário */}
        <div className="flex items-center gap-4">
          {usuario ? (
            <div className="flex items-center gap-3">
              <Link to={getUserLink()}>
                <div className="w-10 h-10 bg-gradient-to-tr from-pink-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  {usuario.nome?.charAt(0).toUpperCase() ?? '?'}
                </div>
              </Link>
              <span className="hidden sm:inline text-gray-200 font-medium">{usuario.nome}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium shadow-md"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="text-gray-300 hover:text-pink-500 transition text-sm font-medium"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
