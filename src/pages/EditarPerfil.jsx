import { useEffect, useState } from 'react';

export default function EditarPerfil() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [emailAntigo, setEmailAntigo] = useState('');


  useEffect(() => {
    const dados = localStorage.getItem('usuario');
    if (dados) {
      const dadosUsuario = JSON.parse(dados);
      setUsuario({
        nome: dadosUsuario.nome || '',
        email: dadosUsuario.email || '',
        senha: '', // nunca armazene senha no localStorage, comece vazia
      });
      setEmailAntigo(dadosUsuario.email); // <- novo estado para manter o email original
    } else {
      window.location.href = '/login';
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar os dados para o back-end
    try {
      const response = await fetch('http://localhost/Tickets/backend/update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: usuario.nome,
          emailNovo: usuario.email,
          senha: usuario.senha,
          emailAntigo: emailAntigo
        }),

      });

      const resultado = await response.json();

      if (resultado.success) {
        alert('Perfil atualizado com sucesso!');
        localStorage.setItem('usuario', JSON.stringify({
          nome: usuario.nome,
          email: usuario.email
        }));

      } else {
        alert('Erro ao atualizar: ' + resultado.message);
      }
    } catch (err) {
      alert('Erro na conexão com o servidor');
    }
  };

  return (
    <div className="min-h-screen bg-[#1b1b24] text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mt-8">Editar Perfil</h1>
      <p className="text-gray-400 mb-8">Altere as informações da sua conta</p>

      <form
        onSubmit={handleSubmit}
        className="bg-[#121218] w-full max-w-lg rounded-xl p-6 shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold">⚙ Minhas informações</h2>

        <div>
          <label className="text-sm block mb-1">Nome *</label>
          <input
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            className="w-full bg-[#1e1e2a] text-white rounded p-2"
            required
          />
        </div>

        <div>
          <label className="text-sm block mb-1">E-mail *</label>
          <input
            name="email"
            type="email"
            value={usuario.email}
            onChange={handleChange}
            className="w-full bg-[#1e1e2a] text-white rounded p-2"
            required
          />
        </div>

        <div>
          <label className="text-sm block mb-1">Senha *</label>
          <input
            name="senha"
            type="password"
            value={usuario.senha}
            onChange={handleChange}
            className="w-full bg-[#1e1e2a] text-white rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded p-2 mt-4 font-semibold"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
