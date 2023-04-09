import { PropType, Transition } from 'vue'

import type { ConfigTransitionConfig } from './ConfigTransition.config'

const configTransitionProps = {
  /**
   * @description Provides animated transition effects to a single element or component.
   * @see https://vuejs.org/api/built-in-components.html#transition
   */
  ...Transition.props,
  config: {
    type: Object as PropType<ConfigTransitionConfig>,
    required: true
  }
}

export const props = {
  ...configTransitionProps
}