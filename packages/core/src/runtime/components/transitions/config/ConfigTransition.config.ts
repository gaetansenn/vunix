/**
 * ConfigTransition interface
 *
 * @export
 * @interface ConfigTransition
 * @see https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
 */
export interface ConfigTransitionConfig {
  enter?: {
    fixed: String, // enter-active-class vue class
    from: String, // enter-from-class vue class
    to: String // enter-to-class vue class
  },
  leave?: {
    fixed: String, // leave-active-class vue class
    from: String, // leave-from-class vue class
    to: String // leave-to-class vue class
  }
}