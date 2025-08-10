import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#0d0d13] text-white flex flex-col items-center py-10 px-4 pt-20">
            {/* pt-20 adiciona padding-top para deixar espaço para a navbar fixa */}
            <div className="max-w-4xl w-full">
                <h1 className="text-4xl font-bold mb-6 text-center">Painel do Administrador</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Link to="/admin/GerenciarEvento">
                    <div className="bg-[#1a1a25] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                        <h2 className="text-xl font-semibold mb-2">🔧 Gerenciar eventos</h2>
                        <p className="text-gray-400 text-sm">Edite, exclua ou atualize eventos existentes.</p>
                    </div>
                    </Link>
                    
                    <div className="bg-[#1a1a25] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                        <h2 className="text-xl font-semibold mb-2">👥 Visualizar usuários</h2>
                        <p className="text-gray-400 text-sm">Acesse informações e atividades dos usuários.</p>
                    </div>

                    <div className="bg-[#1a1a25] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                        <h2 className="text-xl font-semibold mb-2">📊 Relatórios de vendas</h2>
                        <p className="text-gray-400 text-sm">Acompanhe estatísticas e vendas de ingressos.</p>
                    </div>
                   
                    <Link to="/admin/cadastrar-evento">
                        <div className="bg-[#1a1a25] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                            <h2 className="text-xl font-semibold mb-2">➕ Criar novo evento</h2>
                            <p className="text-gray-400 text-sm">Cadastre eventos com nome, local, tipo e capa.</p>
                        </div>
                    </Link>


                    <div className="bg-[#1a1a25] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                        <Link to='/editarperfil'><h2 className="text-xl font-semibold mb-2">Editar perfil</h2>
                        </Link>
                        <p className="text-gray-400 text-sm">Altere email , senha ou nome.</p>

                    </div>
                </div>
            </div>
        </div>
    );
}
