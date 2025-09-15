export function About() {
  const skills = [
    'React', 'TypeScript', 'Next.js', 'Tailwind CSS',
    'Figma', 'Adobe XD', 'Photoshop', 'Illustrator',
    'After Effects', 'Premiere Pro', 'Blender', 'Cinema 4D',
    'Design Thinking', 'Prototyping', 'User Research', 'User Testing',
    'Discovery', 'Strategy', 'Wireframing', 'Visual Design', 'UI Design',
    'UX Design', 'User Flow', 'User Persona', 'User Journey', 'User Scenario',
    'User Story', 'User Task', 'User Feedback',
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-8 text-center text-white">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-2xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl mb-4 text-white">Professional Goals</h3>
            <p className="text-white/80 leading-relaxed">
            As a designer i aim to make the difference in people's lives. I believe good design happens when users don't need to think about it, it simply works and makes their day easier. My goal is to keep growing as a UX designer, learning from people, listening to their needs, and turning those insights into experiences that are both useful and enjoyable. I want to collaborate with teams that share this mindset, where design is not just about looks, but about creating real impact.
            At the end of the day, what excites me most is seeing something I designed helping someone.,whether it saves time, reduces frustration, or simply makes them smile. That's the kind of work I want to keep building.
            </p>
          </div>
          
          <div className="backdrop-blur-2xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl mb-4 text-white">Hard Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 backdrop-blur-xl bg-white/5 rounded-full text-sm text-white border border-white/20 shadow-lg"
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