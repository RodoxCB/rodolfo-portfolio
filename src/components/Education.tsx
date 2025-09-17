export function Education() {
  const education = [
    {
      title: 'Design Bachelor\'s Degree',
      institution: 'Federal University of Espirito Santo',
      field: 'Design',
      year: '2019'
    },
    {
      title: 'Frontend Development',
      institution: 'Alura - alura.com.br',
      field: 'HTMIL, CSS, Javascript, React',
      year: '2022'
    },
    {
      title: 'User Experience Design',
      institution: 'Tera - somostera.com',
      field: 'UX/UI Design Certificate',
      year: '2020'
    }
  ];

  const certificates = [
    'UX Design - Design Thinking',
    'UI Design - Ready to Code Components',
    'UX Writing - Adapting Messaging for Different User Perspectives',
    'Adobe Stack - Video and Graphic Design Expert',
    'AI Powered Dev - Development of Interactive Interfaces with Ai tools',
  ];

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center text-white">Academic Background & Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl mb-6 text-white text-center">Education</h3>
            <div className="space-y-4 flex-1">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-2xl bg-white/5 rounded-xl p-4 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300"
                >
                  <h4 className="text-lg text-white">{edu.title}</h4>
                  <p className="text-blue-300">{edu.institution}</p>
                  <p className="text-white/60">{edu.field} • {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col h-full">
            <h3 className="text-2xl mb-6 text-white text-center">Skills</h3>
            <div className="space-y-3 flex-1">
              {certificates.map((cert, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-2xl bg-white/5 rounded-xl p-4 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300"
                >
                  <p className="text-white">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}