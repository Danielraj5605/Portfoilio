/** Case studies, written from each project's repository README. */
export type ProjectArt = 'radar' | 'keys' | 'chat' | 'orbit';

export type Project = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  /** Bento size on desktop */
  size: 'feature' | 'tall' | 'wide';
  art: ProjectArt;
  /** Two colours for the generated cover art */
  palette: [string, string];
  role: string;
  /** Domain tags (not a tech-stack claim) */
  tags: string[];
  stack?: string[];
  links?: { live?: string; repo?: string };
  /** Real screenshot in /public/projects; replaces the generated cover art */
  image?: string;
  /** Shown in the pinned landing stack; the rest appear under "More projects" */
  featured?: boolean;
  problem: string;
  approach: string[];
  outcome: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: 'ghost-api',
    featured: true,
    name: 'Ghost API',
    kind: 'AI agent · website to typed API client',
    tagline: 'Give it a website. Get back a tested API client.',
    summary:
      'Removes the manual work of copying requests out of DevTools. An AI agent that explores a site in a real browser, works out its hidden JSON API and generates a typed, verified Python or TypeScript client.',
    size: 'wide',
    art: 'chat',
    palette: ['#5b4bd6', '#c9f0e4'],
    image: '/projects/ghost-api.png',
    role: 'Developer',
    tags: ['AI agents', 'Reverse engineering', 'Code generation', 'Developer tools'],
    stack: ['Python', 'Playwright', 'FastAPI', 'React', 'pydantic', 'Gemini'],
    links: { repo: 'https://github.com/Danielraj5605/Ghost-api' },
    problem:
      'Almost every modern site loads its data through a hidden internal API, but getting at it means brittle HTML scrapers or hours of copying requests out of browser DevTools. No existing tool both discovers these APIs and writes working code for them.',
    approach: [
      'An agent explores the site by clicking, searching and scrolling in Playwright, capturing the JSON traffic while redacting cookies, tokens and keys before anything is stored or sent to an LLM.',
      'Hypotheses such as pagination style, required headers and API keys are tested with direct calls, and endpoints are only reported when the tests confirm them.',
      'A pydantic-typed client, pytest suite, OpenAPI 3.1 spec and report are generated; the tests run against the live API and failures are repaired for up to three rounds.',
    ],
    outcome:
      'Evaluated end to end on four sites using free LLM tiers: every goal endpoint found, nothing invented, and every generated client test passing, in 1–10 LLM calls per site. It also ships a live terminal UI, a local web dashboard and a one-file shareable report.',
    highlights: ['100% recall and precision on 4 sites', 'Python + TypeScript clients', 'Never calls state-changing endpoints', 'Runs on free LLM tiers'],
  },
  {
    slug: 'log-whisperer',
    featured: true,
    name: 'Log Whisperer',
    kind: 'AI live log intelligence agent',
    tagline: 'An alert that explains the root cause, not just the error.',
    summary:
      'Replaces a wall of duplicate alerts with one that names the cause. A CLI agent that tails logs from files, Docker or stdin and uses an LLM to raise evidence-backed anomaly alerts.',
    size: 'wide',
    art: 'radar',
    palette: ['#3d5a80', '#c5d8e8'],
    image: '/projects/log-whisperer.png',
    role: 'Developer',
    tags: ['Observability', 'LLM', 'DevOps', 'CLI'],
    stack: ['Python', 'Gemini', 'Claude', 'GPT-4o', 'Ollama', 'Docker'],
    links: { repo: 'https://github.com/Danielraj5605/Log-Whisperer' },
    problem:
      'Rule-based log monitoring matches static patterns and floods teams with duplicate alerts, without saying what is actually going wrong.',
    approach: [
      'Smart triggering wakes the LLM only when something looks wrong, not on every line.',
      'Each alert carries evidence, a likely root cause, the blast radius and what to do now.',
      'Cooldown suppression turns 200 identical errors into one alert with a suppressed count; Windows toast notifications work with the terminal minimised.',
    ],
    outcome: 'A local-first tool that needs only a free Gemini API key to run, with a guided setup wizard.',
    highlights: ['Evidence-backed alerts', 'Cooldown suppression', 'Multiple LLM providers'],
  },
  {
    slug: 'scamshield',
    featured: true,
    name: 'ScamShield',
    kind: 'AI scam-message detector · IBM Z Datathon 2026',
    tagline: 'Paste a message. Learn in plain words if it is a scam.',
    summary:
      'Explains its verdict in words a first-time smartphone user understands. An AI that rates SMS and WhatsApp messages HIGH / MEDIUM / LOW risk, explains why in plain English, and runs on IBM LinuxONE.',
    size: 'feature',
    art: 'radar',
    palette: ['#4a7fd1', '#cfe7f3'],
    image: '/projects/scamshield.png',
    role: 'Developer',
    tags: ['AI for Good', 'Fraud detection', 'NLP', 'IBM LinuxONE'],
    stack: ['Python', 'PyTorch', 'scikit-learn', 'TF-IDF', 'Gradient boosting', 'IBM LinuxONE (s390x)'],
    links: { repo: 'https://github.com/Danielraj5605/ScamShield' },
    problem:
      'Fake KYC alerts, “parcel held” fees and UPI refund tricks hit elderly people and first-time smartphone users hardest — and once an OTP is shared the money is usually gone. Spam filters say “spam” without saying why, and link checkers send private messages to third parties.',
    approach: [
      'A learned ensemble of a TF-IDF logistic-regression model, a 100k-parameter character-level CNN trained from scratch, and a link model that never visits the URL.',
      '23 explainable signals (20 warning, 3 genuine-pattern) such as OTP requests, brand look-alike domains and “digital arrest” scripts, so every verdict comes with reasons a non-technical person understands.',
      'Text normalisation that undoes look-alike letters, “hxxp” and hidden characters, plus an optional GenAI explainer grounded in a curated safety knowledge base.',
    ],
    outcome:
      'Measured on the IBM LinuxONE server where the models were trained: PR-AUC 0.987 on held-out public SMS data (96.9% of scams caught as HIGH, 0.5% false alarms) and 0.997 on unseen Indian-context templates. The README also reports the weak spots honestly, including a few percent of genuine bank alerts rated HIGH.',
    highlights: ['PR-AUC 0.987 / 0.997', 'Reasons + highlighted words', 'Never visits links', 'Trained on IBM LinuxONE'],
  },
  {
    slug: 'job-scheduler',
    featured: true,
    name: 'JobScheduler',
    kind: 'Distributed job scheduling platform',
    tagline: 'Postgres as the queue. No duplicate runs.',
    summary:
      'A production-style job scheduler with projects, queues, retries, dead-letter handling, RBAC and a live React dashboard.',
    size: 'tall',
    art: 'keys',
    palette: ['#6d5cf0', '#d7d1ff'],
    image: '/projects/job-scheduler.png',
    role: 'Full-stack developer',
    tags: ['Backend', 'Queues', 'Reliability', 'RBAC'],
    stack: ['TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL (Supabase)', 'React', 'Zod'],
    links: { live: 'https://job-scheduling-platform.vercel.app', repo: 'https://github.com/Danielraj5605/-Job-Scheduling-Platform-' },
    problem:
      'Background work has to run exactly once, survive crashed workers, and be visible to the people who depend on it — without standing up Redis or Kafka for every small project.',
    approach: [
      'Workers claim jobs atomically with `FOR UPDATE SKIP LOCKED`, so two workers never pick up the same job.',
      'Immediate, delayed, scheduled, recurring and batch jobs, with configurable retry policies, backoff and a dead-letter queue.',
      'Heartbeats and a stale-worker reaper recover jobs from crashed workers; Supabase JWT auth, role-based access and Zod validation guard the REST API.',
    ],
    outcome:
      'A deployed platform with a real-time dashboard for queues, executions, logs and dead-letter jobs, built on plain PostgreSQL.',
    highlights: ['Atomic job claiming', 'Retries + dead-letter queue', 'Crashed-worker recovery', 'Live dashboard'],
  },
  {
    slug: 'zenx-crm',
    featured: true,
    name: 'ZenX CRM',
    kind: 'AI-native CRM',
    tagline: 'Describe your audience. The CRM builds it.',
    summary:
      'A mini CRM and campaign platform for D2C brands where segments and messages start from plain English, powered by Gemini.',
    size: 'wide',
    art: 'orbit',
    palette: ['#f28a52', '#a9c79a'],
    image: '/projects/zenx-crm.png',
    role: 'Full-stack developer',
    tags: ['CRM', 'AI', 'Segmentation', 'Campaigns'],
    stack: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'Supabase PostgreSQL', 'Gemini 2.0 Flash'],
    links: { live: 'https://zenx-crm.vercel.app', repo: 'https://github.com/Danielraj5605/AI-Native-CRM' },
    problem:
      'Marketing teams turn simple intentions — “VIP customers who haven’t ordered in 60 days” — into rigid filter builders, spreadsheet exports and untracked messages.',
    approach: [
      'Natural-language segmentation: Gemini converts a sentence into query filters.',
      'AI-drafted, personalised message templates for WhatsApp, SMS or email.',
      'A separate mock channel service simulates a messaging gateway with asynchronous webhooks, so each message is tracked from queued to delivered, opened and clicked.',
    ],
    outcome:
      'A deployed three-service system with a live analytics dashboard (delivery, open and click rates) fed by pre-calculated PostgreSQL triggers.',
    highlights: ['Plain-English segments', 'AI message drafting', 'Webhook delivery tracking', 'Live analytics'],
  },
  {
    slug: 'edgecraft',
    name: 'EdgeCraft',
    kind: 'Hierarchy analyzer · SRM Full Stack Challenge',
    tagline: 'Turn A->B relationships into trees, cycles and summaries.',
    summary:
      'A REST API and web UI that builds tree structures from node relationships, detects cycles and flags invalid entries.',
    size: 'wide',
    art: 'orbit',
    palette: ['#2b8cf0', '#d3c6ff'],
    image: '/projects/edgecraft.png',
    role: 'Full-stack developer',
    tags: ['Algorithms', 'REST API', 'Visualisation'],
    stack: ['Node.js', 'Express', 'JavaScript', 'HTML/CSS'],
    links: { live: 'https://edge-craft.vercel.app', repo: 'https://github.com/Danielraj5605/EdgeCraft' },
    problem:
      'Given raw `X->Y` relationships, build correct hierarchies while rejecting malformed input, self-loops and cycles.',
    approach: [
      'A `POST /bfhl` endpoint validates the format (single uppercase letters, no self-loops), builds the trees and detects cycles.',
      'An interactive frontend takes the input and visualises the result with an analytical summary.',
    ],
    outcome: 'Built for the SRM Full Stack Engineering Challenge and deployed on Vercel.',
    highlights: ['Cycle detection', 'Input validation', 'Deployed API + UI'],
  },
];

export type MoreProject = { name: string; blurb: string; stack: string[]; repo: string };

/** Smaller projects without a full case study. Descriptions come from each repo's README. */
export const moreProjects: MoreProject[] = [
  {
    name: 'HabitFlow',
    blurb: 'Habit tracker with streaks, weekly progress and analytics. React + TypeScript frontend, FastAPI backend, cloud Postgres.',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    repo: 'https://github.com/Danielraj5605/habitflow-builder',
  },
  {
    name: 'Quizzo',
    blurb: 'Quiz platform with admin and user roles, multiple-choice quizzes and automatic scoring.',
    stack: ['Node.js', 'Express', 'MySQL'],
    repo: 'https://github.com/Danielraj5605/Online-Quiz-Platform',
  },
  {
    name: 'Phishing URL Detector',
    blurb: 'Flask app that classifies URLs as safe, suspicious or phishing, mixing rules with a logistic-regression model and explaining why.',
    stack: ['Python', 'Flask', 'scikit-learn'],
    repo: 'https://github.com/Danielraj5605/Phishing-URL-Detector',
  },
  {
    name: 'Pothole Detection & Alerts',
    blurb: 'Prototype civic-reporting platform: FastAPI backend, map-based PWA and a data-upload simulator, with offline YOLO detection.',
    stack: ['Python', 'FastAPI', 'Leaflet', 'YOLO'],
    repo: 'https://github.com/Danielraj5605/Real-time-pothole-detection',
  },
  {
    name: 'StreamGrab',
    blurb: 'YouTube video and playlist downloader up to 4K with MP3 extraction and live progress.',
    stack: ['React', 'FastAPI', 'yt-dlp'],
    repo: 'https://github.com/Danielraj5605/YouTube-Media-Downloader',
  },
  {
    name: 'ClearLens',
    blurb: 'Dataset quality and data-cleaning system.',
    stack: ['Python'],
    repo: 'https://github.com/Danielraj5605/cleanlens',
  },
];

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
