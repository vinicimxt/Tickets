import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

function Buscar() {
  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  const buscarEventos = () => {
    fetch(`http://localhost/Tickets/backend/buscar_evento.php?q=${encodeURIComponent(pesquisa)}`)
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error("Erro ao buscar eventos:", err));
  };

  useEffect(() => {
    buscarEventos();
  }, []);

  const formatarData = (dataStr) => {
    const date = new Date(dataStr);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
    const semana = date.toLocaleString('pt-BR', { weekday: 'short' }).toUpperCase();
    const dataFormatada = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return { day: dia, month: mes, weekday: semana, full: dataFormatada };
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <main className="flex-grow p-6 max-w-7xl mx-auto pt-[80px]">
        <h1 className="text-3xl font-bold mb-6">Buscar Eventos</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Digite o nome do evento"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
          <button
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
            onClick={buscarEventos}
          >
            Filtrar
          </button>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((evento) => {
            const data = formatarData(evento.data);
            return (
              <EventCard
                key={evento.id}
                id={evento.id} // ✅ importante
                imagem={evento.imagem}
                titulo={evento.titulo}
                local={evento.local}
                data={evento.data}
                organizador={evento.organizador}
                day={new Date(evento.data).getDate()}
                month={new Date(evento.data).toLocaleString('pt-BR', { month: 'short' })}
                weekday={new Date(evento.data).toLocaleString('pt-BR', { weekday: 'short' })}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Buscar;
