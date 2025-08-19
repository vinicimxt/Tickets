import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [organizadores, setOrganizadores] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost/Tickets/backend/detalhes_organizador.php")
      .then(res => res.json())
      .then(data => setOrganizadores(data))
      .catch(err => console.error("Erro ao carregar organizadores:", err));
  }, []);
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
          value={evento.data ? evento.data.slice(0, 16) : ""}
          onChange={handleChange}
          required
          className="p-2 rounded text-white"
        />
        <select
          name="organizador_id"
          value={evento.organizador_id}
          onChange={handleChange}
          required
          className="p-2 rounded text-white bg-[#1c1c28]"
        >
          <option value="">Selecione um organizador</option>
          {organizadores.map(org => (
            <option key={org.id} value={org.id}>
              {org.nome}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="imagem"
          value={evento.imagem || ""}
          onChange={handleChange}
          placeholder="URL da imagem"
          required
          className="p-2 rounded text-white"
        />
        <textarea
          type="text"
          name="descricao"
          value={evento.descricao || ""}
          onChange={handleChange}
          placeholder="Descrição do evento"
          required
          className="p-2 rounded text-white"
        />
        <textarea
          type="text"
          name="lineup"
          value={evento.lineup || ""}
          onChange={handleChange}
          placeholder="lineup linha por linha"
          required
          className="p-2 rounded text-white"
        />
        <input
          type="text"
          name="imagemMapa"
          value={evento.imagemMapa || ""}
          onChange={handleChange}
          placeholder="Imagem do mapa "
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
