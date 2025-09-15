export function Experience() {
  const experiences = [
    {
      company: 'Volkswagen Truck and Bus',
      position: 'Senior UI/UX Designer',
      period: '2022 - Present',
      description: 'Leading the UI/UX development team for in-vehicle HMI systems, designing and developing user interfaces for instrument clusters, infotainment systems, mobile applications, and web platforms.'
    },
    {
      company: 'EDAG Group',
      position: 'Senior UI/UX Designer',
      period: '2024 - Present',
      description: 'Senior Partner, leading the UI/UX development team in building HMI systems for Volkswagen Truck & Bus, covering in-vehicle interfaces, web platforms, and mobile applications.'
    },
    {
      company: 'Zeentech',
      position: 'Mid Level UI/UX Designer',
      period: '2023 - 2024',
      description: 'Responsible for the continuous development and design of HMI features for various Volkswagen Truck & Bus vehicles.'
    },
    {
      company: 'MSX International',
      position: 'Junior UI/UX Designer',
      period: '2022 - 2023',
      description: 'Contributed to the team that developed the first digital cluster instrument panel for Volkswagen Truck & Bus, as well as their first mobile app for vehicle interaction.'
    },
    {
      company: 'Paytime',
      position: 'Junior UI Designer',
      period: '2022 - 2022',
      description: 'Worked as part of the UI Design team, creating multiple product screens while introducing and fostering a culture of user research and feature testing within the company.'
    },
    {
      company: 'SME Consult',
      position: 'Freelance UI/UX Designer',
      period: '2021 - 2023',
      description: 'Designed prototypes aimed at making workers lives safer and reducing the risk of injuries from psychological stress or illness while working in hazardous environments or with heavy machinery.'
    },
    {
      company: 'UpperSoft',
      position: 'Junior Designer',
      period: '2020 - 2021',
      description: 'Designed and produced short videos/animations for the marketing team and developed animations using lottie for mobile apps.'
    },
    {
      company: 'Freelancer',
      position: 'Filmmaker',
      period: '2013 - 2020',
      description: 'Scriptwriter, director, editor, cameraman, and sound designer, I wore many hats while producing videos and commercials for clients across various industries.'
    },
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center text-white">Professional Experience</h2>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="backdrop-blur-2xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 hover:shadow-3xl transition-all duration-300"
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