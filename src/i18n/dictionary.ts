export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    certifications: string;
    experience: string;
    clients: string;
    portfolio: string;
    testimonials: string;
  };
  hero: {
    greeting: string;
    const: string;
    name: string;
    roleLine: string;
    statement: string;
    viewProjects: string;
    getInTouch: string;
  };
  projects: {
    title: string;
    seeAll: string;
    viewProject: string;
    viewLive: string;
    downloadApp: string;
    featured: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
    pageTitle: string;
    pageSubtitle: string;
    email: string;
    linkedin: string;
    github: string;
    location: string;
  };
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    skillsTitle: string;
    skills: string[];
  };
  certifications: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
    subtitle: string;
    current: string;
  };
  clients: {
    title: string;
    subtitle: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  case: {
    role: string;
    company: string;
    tools: string;
    location: string;
    duration: string;
    introduction: string;
    responsibilities: string;
    challenge: string;
    process: string;
    personas: string;
    personaBackground: string;
    personaNeeds: string;
    personaChallenges: string;
    results: string;
    deliverables: string;
    contribution: string;
    testimonial: string;
    otherComments: string;
    takeaways: string;
    nextProject: string;
    backToPortfolio: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    connect: string;
    rights: string;
  };
}
