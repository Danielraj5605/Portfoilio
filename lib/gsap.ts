import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Loaded lazily (see useScrollScene / SmoothScroll) so GSAP stays out of the
// first-load bundle; plugins are registered once, on the client.
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
