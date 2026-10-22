import { TransitionLink } from '@/components/providers/PageTransition';

export function CaseStudyButton({ href }: { href: string }) {
  return (
    <TransitionLink
      href={href}
      className="inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      Case Study
    </TransitionLink>
  );
}
