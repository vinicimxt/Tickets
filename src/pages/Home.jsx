import EventCard from '../components/EventCard';
import { parseDateInfo } from '../utils/dateutils';
import { useEffect, useState } from 'react';
import FeaturedEvent from '../components/FeatureEvent';
import { Link } from 'react-router-dom';
import teste from '../../dist/assets/images/teste.webp';
import arenarock from '../../dist/assets/images/arenarock.webp';
import ggcon from '../../dist/assets/images/ggcon.webp';
import roupanova from '../../dist/assets/images/roupanova.webp';
function Home() {

  const eventOfTheDay = {
    image: teste,
    title: 'Guy J @ Ópera de Arame',
    location: 'Curitiba',
    venue: 'Planeta Brasil',
    date: '06/09/25',
  };
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost/Tickets/backend/listar_eventos.php")
      .then((res) => res.json())
      .then((data) => setEventos(data || []))
      .catch((error) => console.error("Erro ao buscar eventos:", error));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#1c1c28]">
      

      <main className="bg-[#1c1c28] flex flex-1 p-4 md:p-8">
        <div className="flex flex-col flex-1 gap-14 md:gap-12">
          {/* Topo: evento destaque + texto + busca */}
          <div className="container mx-auto flex flex-col gap-10 px-3 pt-4 md:flex-row md:px-0 md:pt-20 xl:gap-40">
            <FeaturedEvent
              image={eventOfTheDay.image}
              title={eventOfTheDay.title}
              location={eventOfTheDay.location}
              venue={eventOfTheDay.venue}
              date={eventOfTheDay.date}
            />

            <div className="flex flex-1 flex-col gap-4 md:self-center px-4 md:px-0 text-white">
              <div className="flex flex-col gap-1 text-3xl font-medium md:gap-2 md:text-4xl xl:text-5xl">
                <p>Suas experiências</p>
                <p>em um só lugar?</p>
                <p className="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  É na Softwave Access.
                </p>
              </div>

              <main className="relative flex w-full flex-col gap-2 mt-4">
                <div className="flex h-12 items-center gap-2 rounded-lg bg-white px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6 text-custom-400 text-black "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <input
                    className="h-full w-full bg-transparent text-black outline-none placeholder:text-text-600 text-base md:text-lg"
                    placeholder="Pesquise qualquer evento..."
                    // Você pode conectar a lógica de busca aqui, se desejar
                  />
                </div>
              </main>
            </div>
          </div>

          {/* Populares */}
          <section className="container mx-auto px-3 md:px-0">
            <h2 className="text-2xl font-bold text-white mb-6">Populares</h2>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(eventos) && eventos.length > 0 ? (
                eventos.map((evento) => {
                  const { day, month, weekday } = parseDateInfo(evento.data || '');
                
                  let imageSrc = evento.imagem || teste;
                 
                  // Exemplo simples:
                  if (evento.titulo?.toLowerCase().includes('roupa nova')) imageSrc = roupanova;
                  else if (evento.titulo?.toLowerCase().includes('arena rock')) imageSrc = arenarock;
                  else if (evento.titulo?.toLowerCase().includes('ggcon')) imageSrc = ggcon;

                  return (
                    <EventCard
                      key={evento.id}
                      {...evento}
                      day={day}
                      month={month}
                      weekday={weekday}
                      image={imageSrc}
                    />
                  );
                })
              ) : (
                <p className="text-gray-400 text-center w-full">
                  Nenhum evento disponível no momento.
                </p>
              )}
            </div>
          </section>

          {/* Botão ver todos */}
          <Link to="/buscar"
            className="bg-purple-400 w-[60%] md:w-[20%] text-center rounded-lg mx-auto py-2 font-bold hover:bg-purple-500 transition-all duration-100 cursor-pointer"
            href="/events"
          >
            Ver todos os eventos
          </Link>

         

          {/* Seção extra (tipo a do segundo código) */}
          <div className="flex flex-col md:flex-row items-center gap-8 my-16 bg-[#060019] p-6 rounded-2xl shadow-lg">
            <img
              src={teste}
              alt="Turnê Novo Artista"
              className="w-full md:w-1/2 rounded-lg"
            />
            <div className="text-white md:w-1/2">
              <h2 className="text-2xl font-semibold mb-3">Nome do Artista</h2>
              <p className="text-gray-300 mb-6">
                Descrição da nova turnê. Detalhe os locais, datas ou informações especiais para atrair o público.
                Pode mencionar álbuns novos, parcerias ou diferenciais dessa turnê.
              </p>
              <button className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition">
                Ver Eventos
              </button>
            </div>
          </div>

        </div>
        
      </main>

     
    </div>
  );
}

export default Home;
