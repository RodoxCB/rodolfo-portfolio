import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

export function Portfolio() {
  const projects = [
    {
      title: 'Volks | Connect Mobile App',
      description: 'A mobileapp that connects the truck, the driver and the fleet manager, integrating a digital enviroment for the trucks and buses of Volkswagen Truck and Bus.',
      image: '/volksconnect.jpg',
      technologies: ['Ux Research', 'Ui Design', 'Figma', 'React'],
      link: 'https://www.behance.net/gallery/234619233/Volks-Connect-Ui-Ux'
    },
    {
      title: 'Volkswagen Turck and Bus Infotainment',
      description: 'User-friendly mobile banking application with secure transactions and modern UI design.',
      image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU3NTExNzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['React Native', 'Redux', 'Firebase'],
      link: '#'
    },
    {
      title: 'Volkswagen Truck and Bus Digital Cluster',
      description: 'Modern corporate website with responsive design and optimized performance for better user experience.',
      image: 'https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc1NzUyNjk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      link: '#'
    },
    {
      title: 'Smart Watch App - SME Consultant',
      description: 'Modern corporate website with responsive design and optimized performance for better user experience.',
      image: 'https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc1NzUyNjk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      link: '#'
    },
    {
      title: 'Volkswagen Truck and Bus Digital Cluster',
      description: 'Modern corporate website with responsive design and optimized performance for better user experience.',
      image: 'https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc1NzUyNjk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      link: '#'
    },
    {
      title: 'Marketing Video',
      description: 'Comprehensive design system with reusable components and design tokens for consistent branding.',
      image: 'https://images.unsplash.com/photo-1617783919077-f86206a0f495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMHV4JTIwZGVzaWduJTIwcG9ydGZvbGlvfGVufDF8fHx8MTc1NzU5OTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      technologies: ['Figma', 'Storybook', 'React', 'CSS-in-JS'],
      link: '#'
    }
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