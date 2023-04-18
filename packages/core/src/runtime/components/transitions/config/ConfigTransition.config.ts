import type { TransitionProps } from 'vue'

/**
 * ConfigTransition interface
 *
 * @export
 * @interface ConfigTransition
 * @see https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
 */
export interface ConfigTransitionConfig {
  enter?: {
    fixed: string, // enter-active-class vue class
    from: string, // enter-from-class vue class
    to: string // enter-to-class vue class
  },
  leave?: {
    fixed: string, // leave-active-class vue class
    from: string, // leave-from-class vue class
    to: string // leave-to-class vue class
  },
  onBeforeEnter?: TransitionProps['onBeforeEnter'],
  onEnter?: TransitionProps['onEnter'],
  onAfterEnter?: TransitionProps['onAfterEnter'],
  onEnterCancelled?: TransitionProps['onEnterCancelled'],
  onBeforeLeave?: TransitionProps['onBeforeLeave'],
  onLeave?: TransitionProps['onLeave'],
  onAfterLeave?: TransitionProps['onAfterLeave'],
  onLeaveCancelled?: TransitionProps['onLeaveCancelled']
}