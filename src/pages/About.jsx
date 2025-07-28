function Sobre() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d13]">
      {/* Conteúdo principal */}
      <main className="flex-grow p-8 ">
        <section className="bg-[#1b1929] text-white py-24 px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Tecnologia em Gestão<br />
                & Controle de <span className="text-purple-400">Eventos</span>
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Se diferencie no mercado de eventos. Tenha o melhor atendimento e atenda o seu modelo de evento com a nossa tecnologia.
              </p>
              <button className="bg-purple-500 hover:bg-purple-600 transition-colors text-white font-semibold py-3 px-6 rounded-xl">
                Entrar em Contato
              </button>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="./dist/assets/bda.jpg"
                alt="Mockup do sistema de controle de eventos"
                className="rounded-2xl shadow-xl w-full max-w-xl"
              />
            </div>
          </div>
        </section>


        <section className="bg-[#1b1929] text-white py-20 px-6 md:px-16">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Inovação <span className="text-purple-400">//</span>
            </h2>
            <p className="text-lg text-gray-300">
              União de inovação e tecnologia no mercado de eventos. Não tenha limitações para as suas criações.
              <br />
              Automatize processos e obtenha resultados especiais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Card 1 */}
            <div className="bg-black rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
              <img src="/icons/marketing.svg" alt="Marketing" className="mb-6 h-12" />
              <span className="text-purple-400 font-bold uppercase tracking-widest text-sm">Venda Mais</span>
              <h3 className="text-2xl font-bold mb-2">Marketing</h3>
              <p className="text-gray-400">
                Potencialize as suas ações de marketing automatizando processos na venda de ingressos
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-black rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
              <img src="/icons/atendimento.svg" alt="Atendimento" className="mb-6 h-12" />
              <span className="text-purple-400 font-bold uppercase tracking-widest text-sm">Tech</span>
              <h3 className="text-2xl font-bold mb-2">Atendimento</h3>
              <p className="text-gray-400">
                Prioridade no atendimento para personalização de novas funcionalidades e suporte 24/7
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-black rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
              <img src="/icons/solucoes.svg" alt="Soluções" className="mb-6 h-12" />
              <span className="text-purple-400 font-bold uppercase tracking-widest text-sm">Ambiente</span>
              <h3 className="text-2xl font-bold mb-2">Novas Soluções</h3>
              <p className="text-gray-400">
                Uma empresa focada em desenvolvimento para o cliente. Sempre buscando novas soluções
              </p>
            </div>
          </div>
        </section>


        <section className="bg-[#0d0d13] text-white py-24 px-6 md:px-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

            {/* Card visual lado esquerdo */}
            <div className="relative w-full md:w-1/2">
              {/* Card preto */}
              <div className="bg-black rounded-2xl p-6 w-full max-w-sm shadow-lg">
                <label className="block text-white text-sm font-medium mb-2">
                  Nome Completo<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center bg-[#1e1e2e] text-white px-4 py-3 rounded-md mb-4">
                  <img src="/imgs/avatar-john.png" alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md mb-2 cursor-not-allowed opacity-60">
                  Continuar
                </button>
                <p className="text-red-400 text-sm text-center mt-2">
                  Você não pode comprar ingressos de Sócio
                </p>
              </div>


            </div>

            {/* Texto lado direito */}
            <div className="w-full md:w-1/2 text-left">
              <h3 className="text-sm font-bold text-yellow-500 uppercase mb-2">O SEU EVENTO</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Customização</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Não adapte o seu evento para a plataforma. A gente se adapta para a sua necessidade. Liberdade para customização no processo de venda.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[#0d0d13] text-white py-20 px-6 md:px-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10">

            {/* Texto da Plataforma */}
            <div className="max-w-xl">
              <h3 className="text-sm font-bold text-purple-400 uppercase">Vendas</h3>
              <h2 className="text-4xl font-extrabold mb-4">Plataforma Completa</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Todas as ferramentas para criação e venda dos ingressos do seu evento.
                Fluxo completo da criação ao recebimento
              </p>
            </div>

            {/* Cards de Dados */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="bg-black rounded-lg p-4 text-center min-w-[120px]">
                  <h4 className="text-sm text-gray-400">Vendas Totais</h4>
                  <p className="text-xl font-bold">R$60.000</p>
                </div>
                <div className="bg-black rounded-lg p-4 text-center min-w-[100px]">
                  <h4 className="text-sm text-gray-400">Usuários</h4>
                  <p className="text-xl font-bold">780</p>
                </div>
                <div className="bg-black rounded-lg p-4 text-center min-w-[100px]">
                  <h4 className="text-sm text-gray-400">Ingressos</h4>
                  <p className="text-xl font-bold">780/800</p>
                </div>
              </div>

              {/* Roles / Cargos */}
              <div className="flex gap-4 mt-4">
                <span className="bg-yellow-800 text-white text-sm px-3 py-1 rounded-full">🔰 Owner</span>
                <span className="bg-blue-800 text-white text-sm px-3 py-1 rounded-full">🔰 Admin</span>
                <span className="bg-purple-800 text-white text-sm px-3 py-1 rounded-full">🔰 Staff</span>
              </div>
            </div>
          </div>
        </section>


        {/* Tecnologia em órbita com texto ao lado */}
        <section className="bg-[#0d0d13] text-white py-24 px-6 md:px-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            {/* Ícones orbitais */}
            <div className="relative w-[300px] h-[300px] mx-auto md:mx-0">
              <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-spin-slow"></div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <img src="" className="w-16 h-16" />
              </div>

              <div className="absolute inset-0 animate-spin-slow">
                <img src="./dist/assets/icons/aws.svg" className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10" />
                <img src="./dist/assets/icons/react.svg" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10" />
                <img src="./dist/assets/icons/nextjs.svg" className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10" />
                <img src="./dist/assets/icons/vite.svg" className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10" />
              </div>
            </div>

            {/* Texto Tech */}
            <div className="text-left">
              <h3 className="text-sm font-bold text-sky-500 uppercase mb-2">Tech</h3>
              <h2 className="text-4xl font-extrabold mb-4">Tecnologia</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Foco em tecnologia – Desenvolvimento acelerado de novas ferramentas & robustez tecnológica de infraestrutura
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#161622] py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">
              O Meaple <span className="text-gray-400">//</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Todas as nossas ferramentas atuais e futuras planejadas.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lote */}
            <div className="bg-black rounded-xl p-6 flex items-center gap-4">
              <div className="bg-purple-900 p-3 rounded-full">
                <span className="text-white text-xl">🎟️</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">LOTE</h3>
                <p className="text-gray-400 text-sm">Virada de lote automática</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-black rounded-xl p-6 flex items-center gap-4">
              <div className="bg-purple-900 p-3 rounded-full">
                <span className="text-white text-xl">💬</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">WHATSAPP</h3>
                <p className="text-gray-400 text-sm">Envio de ingressos via WhatsApp</p>
              </div>
            </div>

            {/* Scan */}
            <div className="bg-black rounded-xl p-6 flex items-center gap-4">
              <div className="bg-purple-900 p-3 rounded-full">
                <span className="text-white text-xl">📷</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">SCAN</h3>
                <p className="text-gray-400 text-sm">Sistema de validação de ingressos</p>
              </div>
            </div>

            {/* Adiantamento */}
            <div className="bg-black rounded-xl p-6 flex items-center gap-4">
              <div className="bg-purple-900 p-3 rounded-full">
                <span className="text-white text-xl">💰</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">ADIANTAMENTO</h3>
                <p className="text-gray-400 text-sm">Personalizado por evento</p>
              </div>
            </div>

            {/* Inteligência Artificial */}
            <div className="bg-black rounded-xl p-6 flex items-center gap-4 relative">
              <div className="bg-purple-900 p-3 rounded-full">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">INTELIGÊNCIA ARTIFICIAL</h3>
                <p className="text-gray-400 text-sm">Integração com IA</p>
              </div>
              <span className="absolute top-2 right-4 bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">
                EM BREVE
              </span>
            </div>

            {/* Revenda */}
            <div className="bg-black rounded-xl p-6 flex items-center gap-4 relative">
              <div className="bg-purple-900 p-3 rounded-full">
                <span className="text-white text-xl">🔁</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">REVENDA</h3>
                <p className="text-gray-400 text-sm">Revenda os ingressos com segurança</p>
              </div>
              <span className="absolute top-2 right-4 bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">
                EM BREVE
              </span>
            </div>
          </div>
        </section>



      </main>


    </div>
  );
}

export default Sobre;
