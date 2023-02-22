import type { PropType } from 'vue';

import type { RuleExpression } from '../../composables/form/rules';
import type { ValueType } from '../../composables/form/field';

export const commonsProps = <T>() => ({
  /**
   * @description Rules to apply to form element
   * @type {string, function}
   */
  rules: {
    type: Array as PropType<RuleExpression<ValueType<T>>[]>,
    defaultValue: []
  }
})