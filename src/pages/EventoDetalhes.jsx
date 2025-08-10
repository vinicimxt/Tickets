import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EventoDetalhes() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost/Tickets/backend/buscar_evento.php?id=${id}`)
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

  return (
    <div className="text-white p-8 min-h-screen bg-[#0d0d13]">
      <img
        src={evento.imagem || evento.image}
        alt={evento.titulo || evento.title}
        className="w-full max-w-3xl mx-auto rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold">{evento.titulo || evento.title}</h1>
      <p className="text-gray-400">{evento.organizador || evento.organizer}</p>
      <p className="mt-2 text-blue-400">{evento.local || evento.location} - {evento.data || evento.date}</p>

      <h2 className="mt-6 text-xl font-semibold">Ingressos</h2>
      <div className="mt-4 space-y-4">
        {(evento.ingressos || []).map((ingresso, idx) => (
          <div key={idx} className="flex justify-between bg-[#1e1e2d] p-4 rounded">
            <span>{ingresso.tipo}</span>
            <span>R$ {ingresso.preco}</span>
            <button
              className="bg-green-500 text-white px-4 py-1 rounded"
              onClick={() => handleComprarIngresso(evento.id, ingresso.tipo)}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function handleComprarIngresso(eventoId, tipoIngresso) {
  const ingressos = JSON.parse(localStorage.getItem("meusIngressos")) || [];
  ingressos.push({ eventoId, tipoIngresso });
  localStorage.setItem("meusIngressos", JSON.stringify(ingressos));
  alert("Ingresso comprado com sucesso!");
}

export default EventoDetalhes;
