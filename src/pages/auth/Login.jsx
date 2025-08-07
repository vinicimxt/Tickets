import { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate , Navigate} from 'react-router-dom';
import { AuthContext } from "../../components/AuthContext";
import { useContext } from 'react';



export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const {usuario, login } = useContext(AuthContext);

if (usuario) {
    return <Navigate to={usuario.tipo === "admin" ? "/admin/dashboard" : "/perfil"} />;
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/Tickets/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await res.json();

      if (data.status === "ok") {
        alert("Login realizado com sucesso!");
        login({ nome: data.nome, email, tipo: data.tipo });

        if (data.tipo === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/perfil");
        }
      }


    } catch (err) {
      alert("Erro ao tentar logar. Verifique a conexão com o servidor.");
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      {/* Faixa com imagem no topo */}
      <div className="relative h-[20vh]">
        <div className="absolute inset-0 bg-black opacity-40 z-10 "></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('./dist/assets/bda.jpg')" }}
        ></div>
      </div>

      {/* Área de login abaixo da faixa */}
      <div className="flex-1 flex items-center justify-center bg-[#0d0d13]">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img src="./dist/assets/icons/react.svg" alt="Logo Meaple" className="h-12" />
          </div>

          <button className="flex items-center justify-center w-full bg-white text-black font-medium py-2 rounded-md mb-4">
            <FaGoogle className="mr-2" />
            Entrar com o Google
          </button>

          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="text-gray-400 px-2 text-sm">OU</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-white text-sm font-medium">E-mail *</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full mt-1 p-2 rounded-md bg-[#1c1c24] text-white placeholder-gray-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium">Senha *</label>
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
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-gray-300 hover:underline">
                  Esqueci a senha
                </a>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#00aaff] text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Entrar
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-300">
            Novo no Tickets? <Link to="/cadastro" className="font-semibold hover:underline" >Criar Conta</Link><br />
            Não lembra por qual e-mail comprou? <a href="#" className="font-semibold hover:underline">Recuperar conta</a>
          </div>
        </div>
      </div>
    </div>
  );
}
