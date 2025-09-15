import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-2 border-white/30 backdrop-blur-md bg-white/10 shadow-2xl ring-1 ring-white/20">
        <img
          src="/rodolfo-headshot.png"
          alt="Rodolfo Behr"
          className="w-full h-full object-cover"
        />
      </div>
      
      <h1 className="text-4xl md:text-6xl mb-4 text-white">Rodolfo Behr</h1>
      <p className="text-xl md:text-2xl mb-8 text-white/80">Front-end & UI/UX Designer</p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          variant="outline" 
          className="backdrop-blur-lg bg-white/15 border-white/30 text-white hover:bg-white/25 shadow-lg ring-1 ring-white/20 transition-all duration-300"
          onClick={() => scrollToSection('about')}
        >
          About
        </Button>
        <Button 
          variant="outline" 
          className="backdrop-blur-lg bg-white/15 border-white/30 text-white hover:bg-white/25 shadow-lg ring-1 ring-white/20 transition-all duration-300"
          onClick={() => scrollToSection('experience')}
        >
          Experience
        </Button>
        <Button 
          variant="outline" 
          className="backdrop-blur-lg bg-white/15 border-white/30 text-white hover:bg-white/25 shadow-lg ring-1 ring-white/20 transition-all duration-300"
          onClick={() => scrollToSection('education')}
        >
          Education
        </Button>
        <Button 
          variant="outline" 
          className="backdrop-blur-lg bg-white/15 border-white/30 text-white hover:bg-white/25 shadow-lg ring-1 ring-white/20 transition-all duration-300"
          onClick={() => scrollToSection('portfolio')}
        >
          Portfolio
        </Button>
      </div>
    </div>
  );
}