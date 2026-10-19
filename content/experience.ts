export type TimelineEntry = {
  role: string;
  org: string;
  period: string;
  kind: 'work' | 'education' | 'community';
  current?: boolean;
  points: string[];
  tags?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    role: 'Full Stack Developer',
    org: 'Techcora Corporation Pvt Ltd',
    period: 'Nov 2025 — Present',
    kind: 'work',
    current: true,
    points: [
      'Developing and improving features for a quick-commerce platform.',
      'Supporting order flow, delivery tracking and user-experience enhancements.',
      'Assisting with API integration, issue resolution and performance optimisation.',
    ],
    tags: ['React.js', 'Node.js', 'REST APIs'],
  },
  {
    role: 'Full Stack Developer Intern',
    org: 'Techcora Corporation Pvt Ltd',
    period: 'Jul 2025 — Oct 2025',
    kind: 'work',
    points: [
      'Inventory Management Platform — designed features that streamlined inventory workflows across departments.',
      'Smart School Tracking System — full-stack web & mobile app with real-time bus tracking and route optimisation.',
      'Supermarket Multi-Tenant Dashboard — multi-branch support with branch-level analytics and access control.',
    ],
    tags: ['React.js', 'Node.js', 'Firebase', 'REST APIs'],
  },
  {
    role: 'Volunteer',
    org: 'Amar Seva Sangam',
    period: 'Jun 2025',
    kind: 'community',
    points: ['Community Service Programme — outreach and community development initiatives.'],
  },
  {
    role: 'B.Tech, Computer Science & Engineering',
    org: 'SRM Institute of Science and Technology',
    period: '2023 — 2027',
    kind: 'education',
    points: ['CGPA 8.31. NPTEL certifications in Machine Learning (IIT Kharagpur) and Java; IBM Python for Data Science.'],
  },
];
