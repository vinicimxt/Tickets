import { useState } from "react";

function CadastroEvento() {
  const [evento, setEvento] = useState({
    title: "",
    location: "",
    date: "",
    organizer: "",
    image: "",
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
        setEvento({ title: "", location: "", date: "", organizer: "", image: "" });
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
        <input type="text" name="title" value={evento.title} onChange={handleChange} placeholder="Título do evento" required className="p-2 rounded text-white" />
        <input type="text" name="location" value={evento.location} onChange={handleChange} placeholder="Local" required className="p-2 rounded text-white" />
        <input type="datetime-local" name="date" value={evento.date} onChange={handleChange} required className="p-2 rounded text-white" />
        <input type="text" name="organizer" value={evento.organizer} onChange={handleChange} placeholder="Organizador" required className="p-2 rounded text-white" />
        <input type="text" name="image" value={evento.image} onChange={handleChange} placeholder="URL da imagem" required className="p-2 rounded text-white" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroEvento;
