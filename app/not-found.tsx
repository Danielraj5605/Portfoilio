import { TransitionLink } from '@/components/providers/PageTransition';

export default function NotFound() {
  return (
    <section className="container-page grid min-h-svh place-items-center py-32 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">404 · Lost in the clouds</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-tight tracking-tight">
          This path drifted away.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">The page you’re looking for doesn’t exist — but the meadow does.</p>
        <TransitionLink href="/" className="mt-8 inline-flex rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent">
          Back home
        </TransitionLink>
      </div>
    </section>
  );
}
