export function Education() {
  const education = [
    {
      title: 'Bachelor\'s Degree',
      institution: 'University of Technology',
      field: 'Computer Science',
      year: '2018'
    },
    {
      title: 'Frontend Development',
      institution: 'FreeCodeCamp',
      field: 'Web Development Certificate',
      year: '2019'
    },
    {
      title: 'UX Design Course',
      institution: 'Google UX Design',
      field: 'UX/UI Design Certificate',
      year: '2020'
    }
  ];

  const certificates = [
    'AWS Certified Cloud Practitioner',
    'Google Analytics Certified',
    'Meta Front-End Developer',
    'Adobe Certified Expert'
  ];

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center text-white">Academic Background & Certificates</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl mb-6 text-white">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/30 shadow-xl ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <h4 className="text-lg text-white">{edu.title}</h4>
                  <p className="text-blue-300">{edu.institution}</p>
                  <p className="text-white/60">{edu.field} • {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl mb-6 text-white">Certificates</h3>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/30 shadow-xl ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300"
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