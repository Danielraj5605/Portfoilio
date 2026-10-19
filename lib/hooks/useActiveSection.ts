'use client';

import { useEffect, useState } from 'react';

/**
 * Id of the section crossing the middle of the viewport, or null (e.g. over the hero).
 * Sections that mount later are picked up automatically.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(',');

  useEffect(() => {
    // Nothing to watch (e.g. a case-study page): clear any highlight left from the previous page.
    setActive(null);
    if (!ids.length) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        setActive(ids.find(id => visible.has(id)) ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const pending = new Set(ids);
    const attach = () => {
      pending.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          io.observe(el);
          pending.delete(id);
        }
      });
      if (!pending.size) mo.disconnect();
    };
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    attach();
    return () => {
      io.disconnect();
      mo.disconnect();
    };
    // `key` stands in for `ids` so a fresh array each render doesn't resubscribe.
  }, [key]);

  return active;
}
