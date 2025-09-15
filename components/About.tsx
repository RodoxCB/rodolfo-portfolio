export function About() {
  const skills = [
    'React', 'TypeScript', 'Next.js', 'Tailwind CSS',
    'Figma', 'Adobe XD', 'Photoshop', 'Illustrator',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL'
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-8 text-center text-white">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/30 shadow-2xl ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="text-xl mb-4 text-white">Professional Goals</h3>
            <p className="text-white/80 leading-relaxed">
              I'm a passionate front-end developer and UI/UX designer with 5+ years of experience 
              creating beautiful, functional web applications. I specialize in modern JavaScript 
              frameworks and have a keen eye for design that converts.
            </p>
          </div>
          
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/30 shadow-2xl ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300">
            <h3 className="text-xl mb-4 text-white">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 backdrop-blur-lg bg-white/15 rounded-full text-sm text-white border border-white/30 shadow-lg ring-1 ring-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}