import EventCard from '../components/EventCard';
import { parseDateInfo } from '../utils/dateutils';
import { useEffect, useState } from 'react';

function Home() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost/Tickets/backend/listar_eventos.php")
      .then((res) => res.json())
      .then((data) => setEventos(data.eventos || []))
      .catch((error) => console.error("Erro ao buscar eventos:", error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d13]">

      <main className="flex-grow p-8 bg-[#0d0d13]">
        {/* Título */}
        <div className="bg-[#16161d] h-[50px]">
          <h1 className="text-4xl font-bold text-center text-blue-800">
            Garanta seu ingresso
          </h1>
        </div>

        <br />

        {/* Hero */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#16161d] p-6 rounded-xl mb-10 gap-6">
          {/* Imagem destaque */}
          <div className="w-[60%] md:w-1/2 rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img
                src="./dist/assets/bda.jpg"
                alt="Evento destaque"
                className="w-[60%] h-64 object-cover"
              />
              <div className="absolute w-[60%] bottom-0 left-0 right-0 bg-black bg-opacity-60 px-4 py-3 text-white">
                <h2 className="font-bold text-lg truncate">
                  BDA 9 Anos - O Futuro Em Seus...
                </h2>
                <div className="flex gap-3 text-sm mt-1">
                  <span>🎤 Batalha da Aldeia</span>
                  <span>📍 São Paulo</span>
                  <span>📅 26/07/25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2 text-white text-center md:text-left">
            <h2 className="text-3xl font-bold leading-tight">
              Suas experiências<br />
              <span className="text-blue-500">em um só lugar</span><br />
              É simples, é Tickets
            </h2>
            <div className="mt-6 bg-white">
              <input
                type="text"
                placeholder="🔍 Pesquise qualquer evento..."
                className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Lista de eventos */}
        <div className="bg-[#16161d] min-h-screen px-6 py-12 text-white">
          <h1 className="text-3xl font-bold mb-6">Populares</h1>

          <div className="flex flex-wrap gap-12 justify-center">
            {Array.isArray(eventos) && eventos.length > 0 ? (
              eventos.map((evento) => {
                const { day, month, weekday } = parseDateInfo(evento.data || '');
                return (
                  <EventCard
                    key={evento.id} 
                    {...evento}
                    day={day}
                    month={month}
                    weekday={weekday}
                  />
                );
              })
            ) : (
              <p className="text-white text-center w-full">Nenhum evento disponível no momento.</p>
            )}
          </div>
        </div>

        {/* Seção extra */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-[#060019]">
          <img
            src="./dist/assets/bda.jpg"
            alt="Turnê Novo Artista"
            className="w-full md:w-1/2 rounded-lg mt-8 ml-8 mb-8"
          />
          <div className="text-white md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">Nome do Artista</h2>
            <p className="text-gray-300 mb-4">
              Descrição da nova turnê. Detalhe os locais, datas ou informações especiais para atrair o público.
              Pode mencionar álbuns novos, parcerias ou diferenciais dessa turnê.
            </p>
            <button className="bg-white text-black font-medium py-2 px-4 rounded hover:bg-gray-200 transition">
              Ver Eventos
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
