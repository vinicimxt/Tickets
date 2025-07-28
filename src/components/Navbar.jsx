
import { Link } from 'react-router-dom';

function Navbar() {
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
      <div className="text-white flex items-center gap-2">
        <Link to="/login" className="md:text-2xl bg-blue-600 px-3 py-1 rounded hover:bg-green-600">Entrar</Link>
        <Link to="/cadastro" className="text-sm sm:text-lg md:text-2xl">Cadastrar</Link>
      </div>
    </div>
  );
}

export default Navbar;
