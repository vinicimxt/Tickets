import { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setMensagem("❌ As senhas não coincidem!");
      return;
    }

    try {
      const resposta = await fetch('http://localhost/Tickets/backend/cadastro.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });


       
      const dados = await resposta.json();

      if (dados.success) {
        setMensagem("✅ Conta criada com sucesso!");
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
      } else {
        setMensagem("❌ Erro ao cadastrar: " + dados.error);
      }
    } catch (error) {
      setMensagem("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Faixa com imagem */}
      <div className="relative h-48 w-full">
        <img
          src="./dist/assets/bda.jpg"
          alt="Faixa de topo"
          className="object-cover w-full h-full"
        />
        <h2 className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-2xl font-bold bg-blue-800">
          Criar Conta
        </h2>
      </div>

      {/* Conteúdo do formulário */}
      <div className="flex justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <p className="text-center text-sm text-gray-400 mb-6">
            Crie sua conta para comprar ingressos
          </p>

          <button className="flex items-center justify-center w-full bg-white text-black font-medium py-2 rounded mb-3">
            <FaGoogle className="mr-2" />
            Entrar com o Google
          </button>

          <p className="text-center text-xs text-gray-400 mb-2">
            Ao continuar com os logins sociais você aceita os <a href="#" className="underline">Termos de Uso</a> & <a href="#" className="underline">Política de Privacidade</a>
          </p>

          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="text-gray-400 px-2 text-sm">OU</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Nome *</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full mt-1 p-2 rounded-md bg-[#1c1c24] text-white placeholder-gray-400 focus:outline-none"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">E-mail *</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full mt-1 p-2 rounded-md bg-[#1c1c24] text-white placeholder-gray-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Senha *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="w-full mt-1 p-2 rounded-md bg-[#1c1c24] text-white placeholder-gray-400 focus:outline-none"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Confirmar senha *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  className="w-full mt-1 p-2 rounded-md bg-[#1c1c24] text-white placeholder-gray-400 focus:outline-none"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-white cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="flex items-start text-sm text-gray-300">
              <input type="checkbox" className="mr-2 mt-1" />
              Aceito os <a href="#" className="underline">Termos de Uso & Política de Privacidade</a> para criar a conta
            </div>

            <button type="submit" className="w-full bg-[#00aaff] text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Cadastrar
            </button>
          </form>

          {mensagem && <p className="text-center text-sm mt-4 text-red-400">{mensagem}</p>}

          <div className="text-center text-sm mt-4 text-gray-400">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-[#00aaff] hover:underline font-medium">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
