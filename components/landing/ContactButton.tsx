import { ArrowRight } from 'lucide-react';

export function ContactButton({ href = '#contact' }: { href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-full transition-[transform,filter] duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 focus-visible:brightness-110 px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 0 0 24px rgba(182, 0, 168, 0.35), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
      <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
