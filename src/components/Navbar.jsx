import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

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
    <div className="bg-[#0d0d13] w-full h-16 flex justify-around items-center">
      <div className="text-white flex items-center gap-4">
        <div className="icon text-2xl font-bold">📆</div>
        <div className="buttons flex items-center gap-4">
          <Link to="/" className="md:text-lg hover:underline">Início</Link>
          <Link to="/buscar" className="md:text-lg hover:underline">Buscar</Link>
          <Link to="/sobre" className="md:text-lg hover:underline">Sobre</Link>
        </div>
      </div>

      <div className="text-white flex items-center gap-4">
        {usuario ? (
          <div className="flex items-center gap-2">
            <Link to={getUserLink()}>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-pink-700 text-white rounded-full flex items-center justify-center font-semibold text-lg md:text-xl">
                {usuario.nome?.charAt(0).toUpperCase() ?? '?'}
              </div>
            </Link>
            <span className="hidden sm:inline md:text-lg">{usuario.nome}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Sair
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="md:text-2xl bg-blue-600 px-3 py-1 rounded hover:bg-green-600">Entrar</Link>
            <Link to="/cadastro" className="text-sm sm:text-lg md:text-2xl">Cadastrar</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
