import type { PropType } from 'vue';

import type { RuleExpression, ValueType } from '../../../composables/forms/field'

export const commonsProps = <T>() => ({
  /**
   * @description Rules to apply to form element
   * @type {string, function}
   */
  rules: {
    type: [String, Function] as PropType<RuleExpression<ValueType<T>>>,
    default: undefined
  }
})