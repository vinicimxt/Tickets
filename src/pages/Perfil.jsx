import { useEffect, useState } from 'react';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem('usuario');
    if (dados) {
      setUsuario(JSON.parse(dados));
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-[#1a1a25] text-white flex flex-col items-center pt-12">
      {/* Avatar */}
      <div className="w-32 h-32 rounded-full bg-pink-700 flex items-center justify-center text-5xl font-bold border-4 border-fuchsia-500 shadow-lg">
        {usuario.nome.charAt(0).toUpperCase()}
      </div>

      {/* Nome e email */}
      <h1 className="mt-4 text-2xl font-bold">{usuario.nome}</h1>
      <p className="text-gray-400 text-sm">{usuario.email}</p>

      {/* Editar perfil (placeholder) */}
      <p className="text-blue-400 hover:underline cursor-pointer text-sm mt-1">Editar perfil ✏️</p>

      {/* Botões de filtro */}
      <div className="flex gap-4 mt-6">
        <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center gap-2">
          📅 Em breve
        </button>
        <button className="bg-[#2e2e3e] hover:bg-[#3a3a50] text-white py-2 px-4 rounded">
          ⏳ Passados
        </button>
      </div>

      {/* Imagem ilustrativa (adicione no public/ ou src/assets) */}
      <div className="flex mt-10">
        <img
          src="/img/arte-perfil.png"
          alt="Arte perfil"
          className="w-40 h-auto"
        />
      </div>

      {/* Mensagem central */}
      <h2 className="mt-6 text-xl font-semibold">Nenhum evento encontrado</h2>
      <p className="text-gray-400 text-sm">Procure alguns eventos pelo Meaple</p>

      {/* Botão de sair */}
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
      >
        Sair
      </button>
    </div>
  );
}
