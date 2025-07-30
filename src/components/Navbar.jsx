import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dados = localStorage.getItem('usuario');
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
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
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-pink-700 text-white rounded-full flex items-center justify-center font-semibold text-lg md:text-xl">
                {usuario.nome.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline md:text-lg">{usuario.nome}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Sair
              </button>
            </div>
          </>
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
