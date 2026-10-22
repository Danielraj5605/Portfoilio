import type { ComponentType, SVGProps } from 'react';
import {
  SiC,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGooglegemini,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

export type Skill = { name: string; Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }> };
export type SkillGroup = { title: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Python', Icon: SiPython },
      { name: 'Java', Icon: SiOpenjdk },
      { name: 'C++', Icon: SiCplusplus },
      { name: 'C', Icon: SiC },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'HTML & CSS', Icon: SiHtml5 },
    ],
  },
  {
    title: 'Backend & data',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express', Icon: SiExpress },
      { name: 'FastAPI', Icon: SiFastapi },
      { name: 'Prisma', Icon: SiPrisma },
      { name: 'Supabase', Icon: SiSupabase },
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'MySQL', Icon: SiMysql },
      { name: 'Firebase', Icon: SiFirebase },
    ],
  },
  {
    title: 'AI & machine learning',
    skills: [
      { name: 'Gemini API', Icon: SiGooglegemini },
      { name: 'PyTorch', Icon: SiPytorch },
      { name: 'scikit-learn', Icon: SiScikitlearn },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Docker', Icon: SiDocker },
    ],
  },
];

export const allSkills = skillGroups.flatMap(g => g.skills);
