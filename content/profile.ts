export const profile = {
  name: 'Danielraj',
  fullName: 'Danielraj S',
  title: 'Full-Stack Engineer · AI Tools & Workflows',
  focus: ['AI-powered tools', 'Workflow automation', 'Plain-language explanations'],
  headline: 'I build small AI tools that remove friction from how teams work.',
  intro:
    'Python and TypeScript engineer who finds the repetitive, slow step in a process and turns it into a simple, deployed tool. AI where it helps, clear documentation so people can actually use it.',
  email: 'danielraj.contact@gmail.com',
  resume: '/resume.pdf',
  links: {
    github: 'https://github.com/Danielraj5605',
    linkedin: 'https://www.linkedin.com/in/danielraj-s-a84bbb310',
  },
  /** Public URL, used for canonical/OG links. Set NEXT_PUBLIC_SITE_URL in Vercel. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const;
