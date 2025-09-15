//import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { useState } from 'react';

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Hero Content Container */}
      <div className="backdrop-blur-2xl bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 max-w-4xl">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border border-white/20 backdrop-blur-lg bg-white/5 shadow-2xl mx-auto">
          <img
            src="/rodolfo-headshot.png"
            alt="Rodolfo Behr"
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl mb-4 text-white drop-shadow-lg">Rodolfo Behr</h1>
        <p className="text-xl md:text-2xl mb-8 text-white/80 drop-shadow-md">End-to-End Designer & Developer</p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            variant="outline" 
            className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
            onClick={() => scrollToSection('about')}
          >
            About
          </Button>
          <Button 
            variant="outline" 
            className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
            onClick={() => scrollToSection('experience')}
          >
            Experience
          </Button>
          <Button 
            variant="outline" 
            className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
            onClick={() => scrollToSection('education')}
          >
            Education
          </Button>
          <Button 
            variant="outline" 
            className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
            onClick={() => scrollToSection('portfolio')}
          >
            Portfolio
          </Button>
          <Button 
            variant="outline" 
            className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="backdrop-blur-2xl bg-white/5 rounded-2xl p-8 max-w-2xl w-full border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-white">Welcome to My Portfolio</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white transition-colors duration-200 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">About My Work</h3>
                <p className="text-white/80 leading-relaxed">
                  I'm a passionate End-to-End Designer & Developer who creates digital experiences that matter. 
                  With expertise spanning from user research and design thinking to Ui Designing and micro animations, 
                  I bring ideas to life through thoughtful design and colaboration.
                </p>
              </div>

              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">What I Do</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Design</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• User Experience Design</li>
                      <li>• User Interface Design</li>
                      <li>• Prototyping & Testing</li>
                      <li>• Design Systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Development</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• React Development</li>
                      <li>• Adobe Stack Full Designer</li>
                      <li>• End to End design</li>
                      <li>• Performance Optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Let's Connect</h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  I'm always excited to work on new projects and collaborate with amazing teams. 
                  Whether you need design, development, or both, let's create something extraordinary together.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
                    onClick={() => {
                      setIsModalOpen(false);
                      scrollToSection('contact');
                    }}
                  >
                    Get in Touch
                  </Button>
                  <Button 
                    variant="outline" 
                    className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
                    onClick={() => {
                      setIsModalOpen(false);
                      scrollToSection('portfolio');
                    }}
                  >
                    View My Work
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}