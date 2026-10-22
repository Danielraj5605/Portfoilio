/**
 * Inline <head> script that runs before first paint:
 *  - picks day/night (saved choice, else system preference) so the sky never flashes
 *  - flags the intro loader (first visit this session, motion allowed) so it covers
 *    the page from the very first frame instead of popping in after hydration
 */
export const THEME_KEY = 'dr-theme';
export const INTRO_KEY = 'dr-intro-seen';

export const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='day'&&t!=='night'){t=matchMedia('(prefers-color-scheme: dark)').matches?'night':'day'}d.dataset.theme=t}catch(e){d.dataset.theme='day'}try{if(!sessionStorage.getItem('${INTRO_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='play'}}catch(e){}})()`;
