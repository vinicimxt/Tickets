import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

function Buscar() {
  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    // Simulando dados (pode vir de um fetch futuramente)
    const dados = [
      {
        id: 1,
        titulo: 'Guy J @ Ópera de Arame',
        imagem: './dist/assets/bda.jpg',
        local: 'Curitiba - Paraná',
        data: '2025-09-06T16:00:00',
        organizador: 'ODD Agency',
      },
      {
        id: 2,
        titulo: 'Trilogia das Aventuras: Alice',
        imagem: './dist/assets/bda.jpg',
        local: 'Niterói - Rio de Janeiro',
        data: '2025-08-08T10:00:00',
        organizador: 'Teatro da UFF',
      },
      // ... outros eventos
    ];

    setEventos(dados);
  }, []);

  // Função para extrair dia, mês e dia da semana
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

    return {
      day: dia,
      month: mes,
      weekday: semana,
      full: dataFormatada,
    };
  };

  const eventosFiltrados = eventos.filter((evento) =>
    evento.titulo.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <main className="flex-grow p-6 max-w-7xl mx-auto pt-[80px]">
        {/* Aqui adicionei pt-[80px] para dar espaço no topo e evitar corte pela navbar */}
        <h1 className="text-3xl font-bold mb-6">Buscar Eventos</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Digite o nome do evento"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">Filtrar</button>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {eventosFiltrados.map((evento) => {
            const data = formatarData(evento.data);
            return (
              <EventCard
                key={evento.id}
                imagem={evento.imagem}
                titulo={evento.titulo}
                local={evento.local}
                data={data.full}
                organizador={evento.organizador}
                day={data.day}
                month={data.month}
                weekday={data.weekday}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
export default Buscar;
