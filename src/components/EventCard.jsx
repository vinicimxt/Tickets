import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

function EventCard({ image, title, location, date, organizer, day, month, weekday }) {
  return (
    <div className="relative bg-[#16161d] rounded-xl overflow-hidden  
                    w-full sm:w-[320px] md:w-[360px] lg:w-[420px] 
                    h-[440px] md:h-[460px] lg:h-[480px]
                    hover:scale-105 transition-transform ">

       {/* Badge de data no canto superior esquerdo */}
      <div className="absolute top-3 left-3 bg-blue-900 text-white text-center rounded-md shadow-lg z-10">
        <div className="bg-[#0d0d13] px-2 py-1 text-xs font-bold rounded-t-md">
          {weekday?.toUpperCase() || 'SAB'}
        </div>
        <div className="px-2 py-1 flex flex-col items-center">
          <div className="text-xl font-extrabold leading-none">{day || '06'}</div>
          <div className="text-[10px] uppercase font-semibold">{month || 'SET'}</div>
        </div>
      </div>


      {/* Imagem do evento */}
      <div className="h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

      </div>

      {/* Conteúdo do card */}
      <div className="p-4 text-white bg-[#16161d]">
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-400 mb-3">{organizer}</p>

        {/* Data */}
        <div className="flex items-center text-sm text-blue-400 mb-1">
          <FaCalendarAlt className="mr-2" />
          <span>{date}</span>
        </div>

        {/* Local */}
        <div className="flex items-center text-sm text-blue-400">
          <FaMapMarkerAlt className="mr-2" />
          <span>{location}</span>
        </div>

        {/* Botão */}
        <div className="mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded w-full">
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
