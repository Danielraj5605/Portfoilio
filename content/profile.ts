export const profile = {
  name: 'Danielraj',
  fullName: 'Danielraj S',
  title: 'Full-Stack Engineer · AI & Enterprise Platforms',
  focus: ['Enterprise risk intelligence', 'Governance tooling', 'AI-native SaaS'],
  headline: 'I build intelligent tools for enterprise risk & governance.',
  intro:
    'From AI risk-intelligence platforms to access-governance systems — software that helps complex organisations see clearly, decide faster and stay compliant.',
  email: 'danielraj.contact@gmail.com',
  resume: '/resume.pdf',
  links: {
    github: 'https://github.com/Danielraj5605',
    linkedin: 'https://www.linkedin.com/in/danielraj-s-a84bbb310',
  },
  /** Public URL, used for canonical/OG links. Set NEXT_PUBLIC_SITE_URL in Vercel. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const;
