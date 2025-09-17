import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Lenis scroll suave, atualiza scrollY
  useLenis(setScrollY);

  const sections = ['hero', 'about', 'experience', 'education', 'portfolio', 'contact'];

  // Detecta mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Atualiza seção atual e botão back-to-top
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i);
          break;
        }
      }

      const scrollTop = scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
      setShowBackToTop(scrollPercentage > 0.8);
    };

    handleScroll(); // inicializa
  }, [scrollY]);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index]);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen relative">
      {/* Fundo escuro sempre visível + Parallax */}
      <div
        className="fixed inset-0 z-0 w-full h-full"
        style={{
          backgroundColor: '#111', // fundo escuro
          backgroundImage: `url('/abstractfull.png')`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${-scrollY * 0.5}px`,
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Navigation Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
            title={`Go to ${section}`}
          />
        ))}
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 py-3 hover:bg-white/30 transition-all duration-300 group flex items-center gap-2"
        >
          <span className="text-white text-sm font-medium">Voltar ao Topo</span>
        </button>
      )}

      {/* Conteúdo */}
      <div className="relative z-10">
        <div id="hero"><Hero /></div>
        <div id="about"><About /></div>
        <div id="experience"><Experience /></div>
        <div id="education"><Education /></div>
        <div id="portfolio"><Portfolio /></div>
        <div id="contact"><Contact /></div>

        {/* Footer */}
        <footer className="py-8 text-center border-t border-white/30 backdrop-blur-xl bg-white/5">
          <p className="text-white/60">© 2025 Rodolfo Behr. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}