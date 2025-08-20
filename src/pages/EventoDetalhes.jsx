
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaClipboard, FaHeadphonesAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EventoDetalhes() {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [organizador, setOrganizador] = useState(null);
    const [openSetorPista, setOpenSetorPista] = useState(false);
    const [openSetorBackstage, setOpenSetorBackstage] = useState(false);

    const [quantidades, setQuantidades] = useState({});

    const ingressosPista = [
        {
            nome: "2º Lote - Meia-Entrada",
            descricao:
                "São beneficiários: Estudantes, idosos, deficientes físicos, professores de rede pública, conforme LEI Nº 12.933 e assinantes do CURITIBACULT.",
            preco: 220.0,
            taxa: 33.0,
        },
        {
            nome: "2º Lote - Solidário",
            descricao:
                "Mediante doação de 1kg de alimento não perecível. Os alimentos devem ser entregues na portaria do evento.",
            preco: 242.0,
            taxa: 36.3,
        },
        {
            nome: "2º Lote - Inteira",
            descricao: "",
            preco: 440.0,
            taxa: 66.0,
        },
    ];

    const ingressosBackstage = [
        {
            nome: "Backstage VIP",
            descricao:
                "Acesso à área exclusiva com visão privilegiada, banheiros e bar exclusivo.",
            preco: 600.0,
            taxa: 90.0,
        },
        {
            nome: "Backstage Meia-Entrada",
            descricao: "Benefício conforme LEI Nº 12.933.",
            preco: 300.0,
            taxa: 45.0,
        },
    ];



    useEffect(() => {
        // Busca os dados do evento
        fetch(`http://localhost/Tickets/backend/listar_eventos.php?id=${id}`)
            .then((res) => res.json())
            .then((dataEvento) => {
                setEvento(dataEvento);

                // Depois busca os dados do organizador
                return fetch(`http://localhost/Tickets/backend/detalhes_organizador.php?id=${dataEvento.organizador_id}`);
            })
            .then((res) => res.json())
            .then((dataOrganizador) => {
                setOrganizador(dataOrganizador);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                alert("Erro ao carregar evento ou organizador");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-white p-8">Carregando...</p>;
    if (!evento || !evento.id)
        return <p className="text-white p-8">Evento não encontrado.</p>;

    const dataFormatada = new Date(evento.data).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const copiarEndereco = () => {
        navigator.clipboard.writeText(evento.local);
        alert("Endereço copiado!");
    };

    const alterarQuantidade = (nome, delta, e) => {
        e.stopPropagation(); // Impede que o clique feche o setor
        setQuantidades((prev) => ({
            ...prev,
            [nome]: Math.max(0, (prev[nome] || 0) + delta),
        }));
    };

    const renderIngressos = (lista) => (
        <div className="mt-3 flex flex-col gap-3">
            {lista.map((ingresso, index) => (
                <div
                    key={index}
                    className="bg-[#2b2b40] rounded-lg p-4 flex flex-col gap-2"
                >
                    <h5 className="font-semibold">{ingresso.nome}</h5>
                    {ingresso.descricao && (
                        <p className="text-sm text-gray-400">{ingresso.descricao}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-bold text-blue-400">
                            R$ {ingresso.preco.toFixed(2).replace(".", ",")}
                            <span className="text-sm text-gray-400">
                                {" "}
                                + R$ {ingresso.taxa.toFixed(2).replace(".", ",")} (taxa)
                            </span>
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => alterarQuantidade(ingresso.nome, -1, e)}
                                className="bg-gray-600 px-2 py-1 rounded"
                            >
                                -
                            </button>
                            <span>{quantidades[ingresso.nome] || 0}</span>
                            <button
                                onClick={(e) => alterarQuantidade(ingresso.nome, 1, e)}
                                className="bg-gray-600 px-2 py-1 rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Dados do carrinho
    const itensSelecionados = Object.entries(quantidades).filter(
        ([, qtd]) => qtd > 0
    );

    const totalQuantidade = itensSelecionados.reduce((sum, [, qtd]) => sum + qtd, 0);
    const totalTaxa = itensSelecionados.reduce((sum, [nome, qtd]) => {
        const ingresso =
            ingressosPista.find((i) => i.nome === nome) ||
            ingressosBackstage.find((i) => i.nome === nome);
        return sum + ingresso.taxa * qtd;
    }, 0);
    const totalPreco = itensSelecionados.reduce((sum, [nome, qtd]) => {
        const ingresso =
            ingressosPista.find((i) => i.nome === nome) ||
            ingressosBackstage.find((i) => i.nome === nome);
        return sum + ingresso.preco * qtd;
    }, 0);

    return (
        <main className="bg-[#1c1c28] min-h-screen pt-16 text-white overflow-x-hidden ">
            <div className="relative ">
                
                <div className="relative h-90 w-full overflow-hidden">
                    <img
                        src={evento.imagem || "https://via.placeholder.com/1200x400"}
                        alt={evento.titulo}
                        className="absolute inset-0 w-full h-full object-cover scale-90 blur-xl"
                    />
                    {/* Degradê que morre na cor do main */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#1c1c28]/60 to-[#1c1c28]" />
                </div>
            </div>

            {/* CONTEÚDO SOBREPOSTO À FAIXA */}
           <div className="relative z-10 -mt-12 md:-mt-60 max-w-7xl mx-auto px-4 md:px-8">
            
                <h1 className="text-4xl font-bold">{evento.titulo}</h1>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-300">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" />
                        <span>{dataFormatada}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>{evento.local}</span>
                    </div>
                </div>

                <div className="flex gap-3 mb-10">
                    <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                            evento.local
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded flex items-center gap-2"
                    >
                        Abrir Maps
                    </a>
                    <button
                        onClick={copiarEndereco}
                        className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaClipboard /> Copiar Endereço
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Coluna da esquerda - Infos e ingressos */}
                    <div className="lg:w-2/3 flex flex-col justify-between bg-[#0d0d13] rounded-lg p-6 shadow-md mb-10">
                        <div>
                            <h2 className="text-xl font-semibold mb-6">Organizador</h2>
                            <div className="flex items-center gap-4">
                                <img
                                    src={organizador?.logo || "/default-logo.png"}
                                    alt={organizador?.nome || "Organizador"}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <span className="text-lg font-semibold">{organizador?.nome || "Nome do organizador"}</span>
                                <div>
                                    <p>{evento.organizador_id}</p>
                                    <p className="text-gray-400 text-sm">
                                        {evento.qtdEventos || "3"} eventos
                                    </p>
                                </div>
                            </div>

                            <section className="mt-10 ">
                                <h3 className="text-2xl font-semibold mb-6">Ingressos</h3>

                                <div
                                    className="bg-[#1e1e2d] rounded-lg p-4 mb-4 cursor-pointer select-none"
                                    onClick={() => setOpenSetorPista(!openSetorPista)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Setor Pista</h4>
                                        <span>{openSetorPista ? "▲" : "▼"}</span>
                                    </div>
                                    {openSetorPista && (
                                        <>
                                            <p className="mt-2 text-gray-400">Acesso ao evento</p>
                                            {renderIngressos(ingressosPista)}
                                        </>
                                    )}
                                </div>

                                <div
                                    className="bg-[#1e1e2d] rounded-lg p-4 cursor-pointer select-none"
                                    onClick={() => setOpenSetorBackstage(!openSetorBackstage)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Setor Backstage</h4>
                                        <span>{openSetorBackstage ? "▲" : "▼"}</span>
                                    </div>
                                    {openSetorBackstage && (
                                        <>
                                            <p className="mt-2 text-gray-400">
                                                Área exclusiva com visão privilegiada, banheiros e bar exclusivo.
                                            </p>
                                            {renderIngressos(ingressosBackstage)}
                                        </>
                                    )}
                                </div>
                            </section>
                        </div>

                        <div className="bg-[#0d0d13] text-white min-h-screen px-6 py-10">
                            <div className="max-w-5xl mx-auto">
                               

                                {/* Descrição */}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-3">Descrição</h2>
                                    <p className="text-gray-300 leading-relaxed">{evento.descricao}</p>
                                </section>

                                {/* Line-up */}
                                {evento.lineup && (
                                    <section className="mb-8">
                                        <h2 className="text-2xl font-semibold mb-3">Line-up</h2>
                                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                                            {evento.lineup.split("\n").map((artista, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <FaHeadphonesAlt className="text-green-400" /> {artista}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {/* Mapa do Evento */}
                                {evento.imagemMapa && (
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-3">Mapa do Evento</h2>
                                        <img
                                            src={evento.imagemMapa}
                                            alt="Mapa do evento"
                                            className="w-full rounded-lg shadow-lg"
                                        />
                                    </section>
                                )}

                                {/* Políticas do Evento */}
                                <section className="mt-10">
                                    <h2 className="text-2xl font-semibold mb-3">Políticas do Evento</h2>
                                    <h3 className="text-lg font-semibold">Cancelamento de pedidos pagos</h3>
                                    <p className="text-gray-400">
                                        Cancelamentos de pedidos serão aceitos até 7 dias após a compra,
                                        desde que a solicitação seja enviada até 48 horas antes do início do evento.
                                    </p>
                                </section>

                                {/* Contatos */}
                                <section className="mt-10">
                                    <h2 className="text-2xl font-semibold mb-3">Contatos</h2>
                                    <div className="bg-[#1e1e2d] rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={organizador?.logo || "/default-logo.png"}
                                                alt={organizador?.nome || "Organizador"}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <span className="text-lg font-semibold">{organizador?.nome || "Nome do organizador"}</span>
                                            <div>
                                                <p className="font-semibold">{evento.organizador_id}</p>
                                                <p className="text-gray-400 text-sm">
                                                    {evento.qtdEventos || 0} eventos
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/organizador/${evento.organizador_id}`}
                                            className="mt-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition inline-block text-white"
                                        >
                                            Ver mais
                                        </Link>
                                    </div>

                                    {evento.instagram && (
                                        <a
                                            href={`https://instagram.com/${evento.instagram}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 mt-3 text-gray-400 hover:text-white"
                                        >
                                            <i className="fab fa-instagram"></i> {evento.instagram}
                                        </a>
                                    )}
                                </section>

                            </div>
                        </div>
                    </div>

                    {/* Coluna da direita */}
                    <div className="lg:w-1/3 flex flex-col gap-6">
                        {/* Imagem sempre visível */}
                        <img
                            src={evento.imagem || "https://via.placeholder.com/200x300"}
                            alt={evento.titulo}
                            className="rounded-lg object-cover w-full "
                        />

                        {/* Carrinho - só aparece se tiver ingressos */}
                        {itensSelecionados.length > 0 && (
                            <div className="bg-[#0d0d13] rounded-lg p-6 shadow-md h-fit mt-4">
                                <h3 className="text-xl font-semibold mb-4">Meu Carrinho</h3>

                                {itensSelecionados.map(([nome, qtd]) => {
                                    const ingresso =
                                        ingressosPista.find((i) => i.nome === nome) ||
                                        ingressosBackstage.find((i) => i.nome === nome);

                                    return (
                                        <div
                                            key={nome}
                                            className="flex justify-between items-center mb-2 text-sm"
                                        >
                                            <span>
                                                {nome} x{qtd}
                                            </span>
                                            <span>
                                                R$ {(ingresso.preco * qtd).toFixed(2).replace(".", ",")}
                                            </span>
                                        </div>
                                    );
                                })}

                                <div className="border-t border-gray-600 pt-2 mt-2 flex justify-between">
                                    <span>Total:</span>
                                    <span>
                                        R$ {(totalPreco + totalTaxa).toFixed(2).replace(".", ",")}
                                    </span>
                                </div>

                                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
                                    Continuar para pagamento
                                </button>
                            </div>
                        )}
                    </div>

                </div>

            </div>


        </main>
    );
}
