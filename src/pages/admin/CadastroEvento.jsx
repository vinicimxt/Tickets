import { useState } from "react";

function CadastroEvento() {
  const [evento, setEvento] = useState({
    titulo: "",
    local: "",
    data: "",
    organizador: "",
    imagem: "",
    descricao: "",
    lineup: "",
    imagemMapa: ""
  });

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/Tickets/backend/salvar_evento.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evento),
      });

      const data = await response.json();
      if (data.success) {
        alert("Evento cadastrado com sucesso!");
        setEvento({
          titulo: "",
          local: "",
          data: "",
          organizador: "",
          imagem: "",
          descricao: "",
          lineup: "",
          imagemMapa: ""
        });
      } else {
        alert("Erro ao cadastrar evento.");
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-[#16161d] text-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Cadastrar Novo Evento</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="titulo" value={evento.titulo} onChange={handleChange} placeholder="Título do evento" required className="p-2 rounded text-white bg-[#1c1c28]" />
        <input type="text" name="local" value={evento.local} onChange={handleChange} placeholder="Local" required className="p-2 rounded text-white bg-[#1c1c28]" />
        <input type="datetime-local" name="data" value={evento.data} onChange={handleChange} required className="p-2 rounded text-white bg-[#1c1c28]" />
        <input type="text" name="organizador" value={evento.organizador} onChange={handleChange} placeholder="Organizador" required className="p-2 rounded text-white bg-[#1c1c28]" />
        <input type="text" name="imagem" value={evento.imagem} onChange={handleChange} placeholder="URL da imagem do evento" required className="p-2 rounded text-white bg-[#1c1c28]" />
        <textarea name="descricao" value={evento.descricao} onChange={handleChange} placeholder="Descrição do evento" rows="4" required className="p-2 rounded text-white bg-[#1c1c28]" />
        <textarea name="lineup" value={evento.lineup} onChange={handleChange} placeholder="Line-up (um por linha)" rows="3" className="p-2 rounded text-white bg-[#1c1c28]" />
        <input type="text" name="imagemMapa" value={evento.imagemMapa} onChange={handleChange} placeholder="URL da imagem do mapa" className="p-2 rounded text-white bg-[#1c1c28]" />
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroEvento;
