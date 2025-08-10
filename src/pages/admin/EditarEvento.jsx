import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost/Tickets/backend/listar_eventos.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setEvento(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Erro ao carregar evento");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/Tickets/backend/editar_evento.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evento),
      });
      const json = await res.json();
      if (json.success) {
        alert("Evento atualizado com sucesso!");
        navigate("/admin/dashboard");
      } else {
        alert("Erro ao atualizar evento");
      }
    } catch {
      alert("Erro de conexão com o servidor");
    }
  };

  if (loading) return <p className="text-white p-8">Carregando...</p>;
  if (!evento) return <p className="text-white p-8">Evento não encontrado.</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-[#16161d] text-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Editar Evento</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="titulo"
          value={evento.titulo || ""}
          onChange={handleChange}
          placeholder="Título do evento"
          required
          className="p-2 rounded text-white"
        />
        <input
          type="text"
          name="local"
          value={evento.local || ""}
          onChange={handleChange}
          placeholder="Local"
          required
          className="p-2 rounded text-white"
        />
        <input
          type="datetime-local"
          name="data"
          value={evento.data ? evento.data.slice(0,16) : ""}
          onChange={handleChange}
          required
          className="p-2 rounded text-white"
        />
        <input
          type="text"
          name="organizador"
          value={evento.organizador || ""}
          onChange={handleChange}
          placeholder="Organizador"
          required
          className="p-2 rounded text-white"
        />
        <input
          type="text"
          name="imagem"
          value={evento.imagem || ""}
          onChange={handleChange}
          placeholder="URL da imagem"
          required
          className="p-2 rounded text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default EditarEvento;
