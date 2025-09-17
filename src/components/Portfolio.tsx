import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

export function Portfolio() {
  const projects = [
    {
      title: 'Volks | Connect Mobile App',
      description: 'A mobileapp that connects the truck, the driver and the fleet manager, integrating a digital enviroment for the trucks and buses of Volkswagen Truck and Bus.',
      image: 'volksconnect.jpg',
      technologies: ['Ux Research', 'Ui Design', 'Figma', 'React', 'After Effects', 'Protopie', 'Unreal Engine', 'Cinema 4D',],
      link: 'https://www.behance.net/gallery/234619233/Volks-Connect-Ui-Ux'
    },
    {
      title: 'Infotainment - Volkswagen Truk and Bus',
      description: 'The first infotainment center made by Volkswagen Truck and Bus, a full cycle project that integrates HMI on vehicles with various targe screens',
      image: 'infotainment-vwtb.jpg',
      technologies: ['Ux Research', 'Ui Design', 'Figma', 'After Effects', 'Protopie', 'Unreal Engine', 'Cinema 4D',],
      link: 'https://www.behance.net/gallery/195768137/HMI-VOLKSWAGEN-VWTB'
    },
    {
      title: 'Full TFT Cluster - Volkswagen Tuck and Bus',
      description: 'The first digital instrument panel cluster made by Volkswagen Truck and Bus,  a full cycle project that integrates HMI on vehicles with various targe screens',
      image: 'cluster-vwtb.jpg',
      technologies: ['Figma', 'Photoshop', 'After Effects', 'Unity', 'Illustrator'],
      link: 'https://www.behance.net/gallery/195768137/HMI-VOLKSWAGEN-VWTB#'
    },
    {
      title: 'Smart Watch App - SME Consultant',
      description: 'Smartwatch app for a company specializing in occupational safety. The watch is designed to monitor workers mental well-being and focus, helping to reduce the risk of accidents.',
      image: 'sme-relogio.jpg',
      technologies: ['Ux Research', 'Ui Design', 'Figma', 'Protopie'],
      link: '#'
    },
    {
      title: 'Papet - Pet Marketplace App',
      description: 'Papet is a UI design case study created to develop and showcase my skills in UI development, demonstrating my ability to build visually appealing components and complex, code-ready design systems.',
      image: 'papet-marketplace.jpg',
      technologies: ['Figma', 'Adobe Photoshop', 'Adobe Ilustrator'],
      link: 'https://www.behance.net/gallery/133368145/PaPet-Marketplace-para-Pets'
    },
    {
      title: 'LottieFiles Animations',
      description: 'Various animations I created using Lottie Files technology, code-ready animations designed for mobile apps and websites.',
      image: 'lottie.png',
      technologies: ['Adobe After Effects', 'LottieFiles',],
      link: 'https://lottiefiles.com/rodoxcb'
    },
    {
      title: 'Brand Design - Viver nas Férias',
      description: 'Viver nas Férias is new brand Design i made to a company located in Gramado, Rio Grande do Sul, Brasil. The brand is focused in renting apartments and houses to people who want to fell like traveling for tourism but being able to work at the same time.',
      image: 'vivernasferias.png',
      technologies: ['Adobe Photoshop', 'Adobe Illustrator',],
      link: 'https://www.behance.net/gallery/205637917/Criacao-de-Logo'
    },
    {
      title: 'Marketing Videos',
      description: 'Audiovisual production and video marketing for companies, apps, artists, and diverse projects.',
      image: 'vimeo-marketing.jpg',
      technologies: ['Adobe After Effects', 'Adobe Premiere', 'Adobe Photoshop', 'Adobe Illustrator', 'Blender', 'Cinema 4D', 'Adobe Media Encoder'],
      link: 'https://vimeo.com/rodolfobehr'
    },
    
  ];

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center text-white">Portfolio</h2>
        <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills in frontend development and UI/UX design.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="backdrop-blur-2xl bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-2xl hover:bg-white/10 hover:shadow-3xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl mb-3 text-white">{project.title}</h3>
                <p className="text-white/80 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 backdrop-blur-xl bg-white/5 rounded text-xs text-white border border-white/20 shadow-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300"
                  onClick={() => window.open(project.link, '_blank')}
                >
                  View Project
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}