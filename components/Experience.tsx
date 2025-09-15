export function Experience() {
  const experiences = [
    {
      company: 'TechCorp',
      position: 'Senior Frontend Developer',
      period: '2022 - Present',
      description: 'Lead frontend development for enterprise applications using React and TypeScript. Mentored junior developers and established coding standards.'
    },
    {
      company: 'Digital Agency',
      position: 'UI/UX Designer & Developer',
      period: '2020 - 2022',
      description: 'Designed and developed responsive websites for clients. Created design systems and improved user experience across multiple projects.'
    },
    {
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      period: '2019 - 2020',
      description: 'Built the company\'s main product interface from scratch. Implemented modern web technologies and optimized performance.'
    },
    {
      company: 'Freelance',
      position: 'Web Developer',
      period: '2018 - 2019',
      description: 'Worked with various clients to create custom websites and web applications. Gained experience in project management and client communication.'
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center text-white">Professional Experience</h2>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/30 shadow-2xl ring-1 ring-white/20 hover:bg-white/15 hover:shadow-3xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 className="text-xl text-white">{exp.position}</h3>
                  <p className="text-blue-300">{exp.company}</p>
                </div>
                <span className="text-white/60 text-sm md:text-base">{exp.period}</span>
              </div>
              <p className="text-white/80 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}