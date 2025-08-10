import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GerenciarEventos() {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/Tickets/backend/listar_eventos.php")
      .then((res) => res.json())
      .then((data) => setEventos(data));

  }, []);

  const excluirEvento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
      const res = await fetch("http://localhost/Tickets/backend/excluir_evento.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json.success) {
        setEventos(eventos.filter((e) => e.id !== id));
        alert("Evento excluído com sucesso!");
      } else {
        alert("Erro ao excluir evento.");
      }
    } catch (err) {
      alert("Erro de conexão.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#1a1a25] rounded-2xl text-white">
      <h2 className="text-2xl font-semibold mb-4">Gerenciar Eventos</h2>
      {eventos.length === 0 ? (
        <p>Nenhum evento encontrado.</p>
      ) : (
        <ul>
          {eventos.map((evento) => (
            <li
              key={evento.id}
              className="flex justify-between items-center bg-[#12121b] p-4 mb-3 rounded"
            >
              <div>
                <strong>{evento.titulo}</strong> — {evento.local} — {new Date(evento.data).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/EditarEvento/${evento.id}`)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirEvento(evento.id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GerenciarEventos;
