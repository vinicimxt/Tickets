
import { FaInstagram, FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#2b2b2b] text-white py-6 ">
      
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4">
        {/* Nome da marca */}
        <div className="text-2xl font-bold mb-4 md:mb-0">Events free</div>

        {/* Ícones sociais */}
        <div className="flex gap-6 text-xl">
          <a href="https://instagram.com/seu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://github.com/seu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
            <FaGithub />
          </a>
          <a href="mailto:seuemail@email.com" className="hover:text-red-500 transition">
            <FaEnvelope />
          </a>
          <a href="https://linkedin.com/in/seu_usuario" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
