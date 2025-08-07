// src/pages/EventoDetalhes.jsx
import { useParams } from 'react-router-dom';

function EventoDetalhes({ eventos }) {
  const { id } = useParams();
  const evento = eventos.find(e => e.id === parseInt(id));

  if (!evento) {
    return <div className="text-white p-8">Evento não encontrado</div>;
  }

  return (
    <div className="text-white p-8 min-h-screen bg-[#0d0d13]">
      <img src={evento.image} alt={evento.title} className="w-full max-w-3xl mx-auto rounded-lg mb-6" />
      
      <h1 className="text-3xl font-bold">{evento.title}</h1>
      <p className="text-gray-400">{evento.organizer}</p>
      <p className="mt-2 text-blue-400">{evento.location} - {evento.date}</p>

      <h2 className="mt-6 text-xl font-semibold">Ingressos</h2>
      <div className="mt-4 space-y-4">
        {evento.ingressos?.map((ingresso, idx) => (
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
