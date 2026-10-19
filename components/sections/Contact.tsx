'use client';

import { Check, Copy, FileText, Loader2, Mail, RotateCcw, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiGithub } from 'react-icons/si';
import { FormField } from '@/components/ui/FormField';
import { MagneticActionButton, MagneticButton } from '@/components/ui/MagneticButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile } from '@/content/profile';
import { ease } from '@/lib/motion';

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Fields = { name: string; email: string; message: string };
type Field = keyof Fields;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';
const EMPTY: Fields = { name: '', email: '', message: '' };

function validate({ name, email, message }: Fields): Errors {
  const e: Errors = {};
  if (!name.trim()) e.name = 'Please tell me your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'That email doesn’t look quite right.';
  if (message.trim().length < 10) e.message = 'A little more detail, please (10+ characters).';
  return e;
}

/** Paper plane that loops off into the sky, then a tick draws itself. */
function SentMark() {
  return (
    <div className="relative h-20 w-full" aria-hidden>
      <motion.div
        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        animate={{ x: [0, 40, 160, 320], y: [0, -30, -10, -90], rotate: [0, -12, 8, -20], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        className="absolute left-0 top-6 text-accent"
      >
        <Send size={28} />
      </motion.div>
      <svg viewBox="0 0 52 52" className="absolute left-0 top-0 size-16 text-accent">
        <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 1, duration: 0.6, ease: ease.out }} />
        <motion.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.5, ease: ease.out }} />
      </svg>
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [shake, setShake] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const [copied, setCopied] = useState(false);
  const sentRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
  }, [status]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const recheck = (field: Field, next: Fields) => setErrors(prev => ({ ...prev, [field]: validate(next)[field] }));

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field;
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) recheck(field, next); // live once visited, so errors clear as you type
  };
  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field;
    if (!values[field] && !touched[field]) return; // don't nag on tab-through
    setTouched(t => ({ ...t, [field]: true }));
    recheck(field, values);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length) {
      setShake(s => s + 1);
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    if (!ACCESS_KEY) {
      setStatus('error');
      setFeedback(`The form isn’t connected yet — please email me at ${profile.email}.`);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${values.name}`,
          from_name: 'Portfolio contact form',
          botcheck: new FormData(form).get('botcheck') ? true : '',
          ...values,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);
      setValues(EMPTY);
      setTouched({});
      setStatus('sent');
    } catch {
      setStatus('error');
      setFeedback(`Something went wrong sending that. Please try again or email ${profile.email}.`);
    }
  };

  const fieldProps = (field: Field) => ({ name: field, value: values[field], onChange, onBlur, error: errors[field], shake });

  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="05 · Contact"
            title="Let’s build something calm, clever and secure."
            highlight={['calm,', 'clever', 'secure.']}
            intro="Open to roles and collaborations in risk, governance and AI-native products. My inbox is always open."
          />

          <div className="glass flex flex-wrap items-center gap-3 rounded-2xl p-4">
            <Mail size={18} className="text-accent-ink" aria-hidden />
            <a href={`mailto:${profile.email}`} className="break-all font-display text-lg font-semibold underline decoration-line underline-offset-4 transition-colors hover:decoration-accent">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="ml-auto grid size-9 place-items-center overflow-hidden rounded-full border border-line transition-transform hover:scale-105 active:scale-90"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={copied ? 'ok' : 'copy'} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.18 }}>
                  {copied ? <Check size={15} className="text-accent-ink" /> : <Copy size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>
            <span role="status" className="sr-only">
              {copied ? 'Email copied to clipboard' : ''}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <MagneticButton href={profile.links.github} target="_blank" rel="noopener noreferrer" variant="ghost">
              <SiGithub size={16} aria-hidden /> GitHub
            </MagneticButton>
            <MagneticButton href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" variant="ghost">
              <FaLinkedinIn size={16} aria-hidden /> LinkedIn
            </MagneticButton>
            <MagneticButton href={profile.resume} target="_blank" rel="noopener noreferrer" variant="ghost">
              <FileText size={16} aria-hidden /> Résumé
            </MagneticButton>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="glass rounded-card p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  role="status"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: ease.out }}
                  className="flex min-h-[24rem] flex-col justify-center gap-5"
                >
                  <SentMark />
                  <h3 ref={sentRef} tabIndex={-1} className="font-display text-3xl font-semibold outline-none">
                    Message sent — thank you!
                  </h3>
                  <p className="text-muted">It’s floating my way. I’ll reply within a couple of days.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent-ink hover:underline">
                    <RotateCcw size={14} className="transition-transform duration-500 group-hover:-rotate-180" aria-hidden /> Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: ease.out }}
                  className="space-y-4"
                  aria-label="Contact form"
                >
                  {/* Honeypot: people never see or fill this */}
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField {...fieldProps('name')} label="Your name" type="text" autoComplete="name" />
                    <FormField {...fieldProps('email')} label="Your email" type="email" autoComplete="email" />
                  </div>
                  <FormField {...fieldProps('message')} multiline label="What are you working on?" rows={6} className="resize-none" />

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <MagneticActionButton type="submit" disabled={status === 'sending'} className="px-7 py-4 text-base">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={status === 'sending' ? 'sending' : 'idle'}
                          initial={{ y: 12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -12, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex items-center gap-2"
                        >
                          {status === 'sending' ? (
                            <>
                              Sending <Loader2 size={16} className="animate-spin" aria-hidden />
                            </>
                          ) : (
                            <>
                              Send message <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                            </>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </MagneticActionButton>
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.p role="alert" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-xs text-sm font-medium text-[#b42318] night:text-[#ff9b8a]">
                          {feedback}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
