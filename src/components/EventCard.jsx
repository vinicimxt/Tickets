import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function EventCard({ id, imagem, titulo, local, data, organizador, day, month, weekday }) {
  return (
    <div className="group relative flex flex-col bg-[#1c1c42] rounded-xl overflow-hidden 
                    shadow-lg hover:shadow-2xl transition-all duration-300 
                    hover:-translate-y-1 w-full sm:w-[320px] md:w-[360px] lg:w-[400px]">

      {/* Imagem */}
      <div className="relative h-48 overflow-hidden ">
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge de data no canto */}
        <div className="absolute bottom-3 left-3 bg-[#0d0d13] text-white rounded-lg shadow-md p-2 text-center">
          <div className="text-xs font-semibold text-gray-300">{weekday?.toUpperCase() || 'SAB'}</div>
          <div className="text-2xl font-bold">{day || '06'}</div>
          <div className="text-[10px] uppercase font-semibold text-gray-400">{month || 'SET'}</div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-lg font-bold text-white mb-1 line-clamp-2">{titulo}</h2>
        <p className="text-sm text-gray-400 mb-3">{organizador}</p>

        <div className="flex items-center text-sm text-gray-300 mb-1">
          <FaCalendarAlt className="mr-2 text-blue-400" />
          <span>{data}</span>
        </div>

        <div className="flex items-center text-sm text-gray-300">
          <FaMapMarkerAlt className="mr-2 text-blue-400" />
          <span>{local}</span>
        </div>

        {/* Botão */}
        <div className="mt-auto pt-4">
          <Link to={`/evento/${id}`}>
            <button className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 
                               hover:from-purple-500 hover:to-purple-700 
                               text-white font-semibold py-2 px-4 rounded-lg w-full transition-all">
              Ver mais
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
