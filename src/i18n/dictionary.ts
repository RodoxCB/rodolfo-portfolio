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
    behance: string;
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
  footer: {
    tagline: string;
    navigation: string;
    connect: string;
    rights: string;
  };
}
