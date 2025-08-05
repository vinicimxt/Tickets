// pages/DetalhesEvento.jsx
import { useParams } from 'react-router-dom';

function DetalhesEvento({ eventos }) {
  const { id } = useParams();
  const evento = eventos.find(e => e.id === parseInt(id));

  if (!evento) return <p>Evento não encontrado</p>;

  return (
    <div className="text-white p-8">
      <h1 className="text-3xl font-bold">{evento.title}</h1>
      <p>{evento.location} - {evento.date}</p>

      <h2 className="mt-6 text-xl font-semibold">Ingressos</h2>
      {evento.ingressos.map((ingresso, idx) => (
        <div key={idx} className="flex justify-between mt-2">
          <span>{ingresso.tipo} - R$ {ingresso.preco}</span>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => handleComprarIngresso(evento.id, ingresso.tipo)}
          >
            Comprar
          </button>
        </div>
      ))}
    </div>
  );
}
