import profile from '../data/profile.json';
import experience from '../data/experience.json';
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import now from '../data/now.json';
import resumeUrl from '../pdf/resume.pdf';

export { profile, experience, projects, skills, now, resumeUrl };

export const RESUME_FILENAME = 'Raj_Halder_Resume.pdf';
export const mailto = `mailto:${profile.email}`;

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
export const caseStudies = projects.filter((p) => p.caseStudy);

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const caseStudyPath = (slug) => `/work/${slug}`;

export const currentJob = experience[0];
