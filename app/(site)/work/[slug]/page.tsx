import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Companion } from '@/components/avatar/Companion';
import { Footer } from '@/components/layout/Footer';
import { CaseStudy } from '@/components/projects/CaseStudy';
import { getProject, projects } from '@/content/projects';
import { getAvatarAssets } from '@/lib/avatar';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} — case study`,
    description: `${project.tagline} ${project.summary}`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.name} — case study`, description: project.summary, url: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.slug === slug);
  if (index === -1) notFound();

  return (
    <>
      <CaseStudy project={projects[index]} next={projects[(index + 1) % projects.length]} />
      <Footer />
      <Companion assets={getAvatarAssets()} beats={{}} fallback={{ pose: 'pointing', line: 'Here’s how I built it!' }} />
    </>
  );
}
