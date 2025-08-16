import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function OrganizadorDetalhes() {
  const { id } = useParams();
  const [organizador, setOrganizador] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        // Buscar organizador
        const orgRes = await fetch(
          `http://localhost/Tickets/backend/detalhes_organizador.php?id=${id}`
        );
        const orgData = await orgRes.json();

        // Buscar eventos do organizador
        const evRes = await fetch(
          `http://localhost/Tickets/backend/listar_eventos.php?organizador_id=${id}`
        );
        const evData = await evRes.json();

        setOrganizador(orgData);
        setEventos(evData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [id]);

  if (loading) return <p className="text-white p-6">Carregando...</p>;
  if (!organizador || organizador.success === false)
    return <p className="text-white p-6">Organizador não encontrado</p>;

  return (
    <div className="min-h-screen bg-[#1a1a25] text-white flex flex-col items-center pt-24 px-6">
      {/* Avatar do organizador */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-5xl font-bold border-4 border-purple-400 shadow-lg">
        {organizador.nome.charAt(0).toUpperCase()}
      </div>

      {/* Nome e descrição */}
      <h1 className="mt-4 text-3xl font-bold">{organizador.nome}</h1>
      <p className="text-gray-400 text-center mt-2 max-w-xl">
        {organizador.descricao || "Este organizador ainda não adicionou uma descrição."}
      </p>

      {/* Contatos */}
      <div className="mt-6 space-y-2 text-center">
        {organizador.email && <p className="text-sm">📧 {organizador.email}</p>}
        {organizador.telefone && (
          <p className="text-sm">📞 {organizador.telefone}</p>
        )}
      </div>

      {/* Eventos */}
      <h2 className="mt-10 text-2xl font-semibold">Eventos desse organizador</h2>

      {eventos.length === 0 ? (
        <p className="text-gray-400 mt-3">Nenhum evento cadastrado ainda.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="bg-[#2e2e3e] rounded-xl shadow-lg p-4 flex flex-col hover:scale-105 transition"
            >
              <img
                src={evento.imagem || "https://via.placeholder.com/400x250"}
                alt={evento.titulo}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-3 text-lg font-bold">{evento.titulo}</h3>
              <p className="text-sm text-gray-400">{evento.local}</p>
              <p className="text-sm text-gray-500">
                {new Date(evento.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <Link
                to={`/evento/${evento.id}`}
                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition"
              >
                Ver detalhes
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
