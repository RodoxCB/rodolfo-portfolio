import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { useEffect, useState } from 'react';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sections = ['hero', 'about', 'experience', 'education', 'portfolio', 'contact'];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i);
          break;
        }
      }

      // Show back to top button when near the bottom of the page
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
      
      setShowBackToTop(scrollPercentage > 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const nextIndex = Math.min(currentSection + 1, sections.length - 1);
    const nextElement = document.getElementById(sections[nextIndex]);
    if (nextElement) {
      nextElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPreviousSection = () => {
    const prevIndex = Math.max(currentSection - 1, 0);
    const prevElement = document.getElementById(sections[prevIndex]);
    if (prevElement) {
      prevElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      {/* Background with Parallax Effect */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(abstractfull.png)`,
          backgroundSize: isMobile ? '110%' : 'cover',
          backgroundPosition: isMobile 
            ? `center ${-scrollY * 0.1}px` 
            : `center ${-scrollY * 0.5}px`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed'
        }}
      />
      
      {/* Navigation Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            title={`Go to ${section}`}
          />
        ))}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 py-3 hover:bg-white/30 transition-all duration-300 group flex items-center gap-2"
          title="Voltar ao Topo"
        >
          <svg
            className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          <span className="text-white text-sm font-medium">Voltar ao Topo</span>
        </button>
      )}

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* Previous Section Button */}
        {currentSection > 0 && (
          <button
            onClick={scrollToPreviousSection}
            className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300 group flex items-center justify-center"
            title="Previous section"
          >
            <svg
              className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}

        {/* Next Section Button */}
        {currentSection < sections.length - 1 && (
          <button
            onClick={scrollToNextSection}
            className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300 group flex items-center justify-center"
            title="Next section"
          >
            <svg
              className="w-6 h-6 text-white group-hover:translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div id="hero">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="contact">
          <Contact />
        </div>
        
        {/* Footer */}
        <footer className="py-8 text-center border-t border-white/30 backdrop-blur-xl bg-white/5">
          <p className="text-white/60">
            © 2025 Rodolfo Behr. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}