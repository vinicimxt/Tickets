import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaClipboard } from "react-icons/fa";

export default function EventoDetalhes() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openSetorPista, setOpenSetorPista] = useState(false);
  const [openSetorBackstage, setOpenSetorBackstage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost/Tickets/backend/listar_eventos.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvento(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Erro ao carregar evento");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-white p-8">Carregando...</p>;
  if (!evento || !evento.id) return <p className="text-white p-8">Evento não encontrado.</p>;

  const dataFormatada = new Date(evento.data).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const copiarEndereco = () => {
    navigator.clipboard.writeText(evento.local);
    alert("Endereço copiado!");
  };

  return (
   <main className="bg-[#1c1c28] min-h-screen pt-16 p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 mt-16">
        {/* Título */}
        <h1 className="text-4xl font-bold">{evento.titulo}</h1>

        {/* Data e Local */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span>{dataFormatada}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>{evento.local}</span>
          </div>
        </div>

        {/* Botões abrir maps e copiar */}
        <div className="flex gap-3">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(evento.local)}`}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded flex items-center gap-2"
          >
            Abrir Maps
          </a>
          <button
            onClick={copiarEndereco}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded flex items-center gap-2"
          >
            <FaClipboard /> Copiar Endereço
          </button>
        </div>

        {/* Seção principal dividida: infos à esquerda, imagem à direita */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Informações (organizador e ingressos) à esquerda */}
          <div className="lg:w-1/2 flex flex-col justify-between bg-[#0d0d13] rounded-lg p-6 shadow-md">
            <div>
              <h2 className="text-xl font-semibold mb-6">Organizador</h2>
              <div className="flex items-center gap-4">
                <img
                  src={evento.logoOrganizador || "https://via.placeholder.com/50"}
                  alt="Logo Organizador"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p>{evento.organizador}</p>
                  <p className="text-gray-400 text-sm">{evento.qtdEventos || "3"} eventos</p>
                </div>
              </div>

              {/* Ingressos */}
              <section className="mt-10">
                <h3 className="text-2xl font-semibold mb-6">Ingressos</h3>

                <div
                  className="bg-[#1e1e2d] rounded-lg p-4 mb-4 cursor-pointer select-none"
                  onClick={() => setOpenSetorPista(!openSetorPista)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold">Setor Pista</h4>
                    <span>{openSetorPista ? "▲" : "▼"}</span>
                  </div>
                  {openSetorPista && <p className="mt-2 text-gray-400">Acesso ao evento</p>}
                </div>

                <div
                  className="bg-[#1e1e2d] rounded-lg p-4 cursor-pointer select-none"
                  onClick={() => setOpenSetorBackstage(!openSetorBackstage)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold">Setor Backstage</h4>
                    <span>{openSetorBackstage ? "▲" : "▼"}</span>
                  </div>
                  {openSetorBackstage && (
                    <p className="mt-2 text-gray-400">
                      Área exclusiva com visão privilegiada, banheiros e bar exclusivo.
                    </p>
                  )}
                </div>
              </section>
            </div>

            <button className="mt-8 self-start bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition">
              Ver Mais
            </button>
          </div>

          {/* Imagem à direita */}
          <div className="lg:w-1/2 rounded-lg overflow-hidden shadow-lg">
            <img
              src={evento.imagem}
              alt={evento.titulo}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Descrição do evento */}
        {evento.descricao && (
          <section className="mt-12 border-t border-gray-700 pt-8 max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">{evento.descricao}</p>
          </section>
        )}
      </div>
    </main>
  );
}
