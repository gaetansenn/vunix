import type { ConfigTransitionConfig } from '../../components/transitions/config/ConfigTransition.config';

const config = {
  enter: {
    fixed: 'overflow-hidden transition-[height] duration-300 ease-in',
    from: 'h-0',
  },
  leave: {
    fixed: 'overflow-hidden transition-[height] duration-300 ease-out',
    to: 'h-0'
  },
  onEnter: (el: HTMLElement, done) => {
    el.style.height = '0';
    el.offsetHeight; // Trigger a reflow, flushing the CSS changes
    el.style.height = el.scrollHeight + 'px';

    el.addEventListener('transitionend', done, { once: true });
  },
  onBeforeLeave(el: HTMLElement) {
    el.style.height = el.scrollHeight + 'px';
    el.offsetHeight; // Trigger a reflow, flushing the CSS changes
  },
  onAfterEnter(el: HTMLElement) {
    el.style.height = 'auto';
  },
  onLeave(el: HTMLElement, done) {
    el.style.height = "0";

    (el as HTMLElement).addEventListener('transitionend', done, { once: true });
  },
} as ConfigTransitionConfig;

export default config;