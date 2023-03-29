<template>
  <FormGroup :config="config" :config-path="configPath" :root-path="rootPath" :required="required"
    :description="description" :label="label" :optional-label="optionalLabel" fieldset>
    <div :class="config.slot">
      <slot />
    </div>
    <template #validation="{ validation }">
      <slot name="validation" :validation="validation" />
    </template>
  </FormGroup>
</template>

<script lang="ts">
import { inject, defineComponent, getCurrentInstance } from 'vue'

import { injectDefaultValues } from '@core/runtime/components/commons/props';
import { useField } from '@core/runtime/composables/form/field';
import { props as inputProps } from './InputGroupCheckbox.props'
import { VunixConfigSymbol } from '@core/runtime/symbols';
import FormGroup from '../../group/FormGroup.vue'
import { useConfig } from '../../../../composables/config';
import type { InputGroupCheckboxConfig } from './InputGroupCheckbox.config';

export default defineComponent({
  components: {
    FormGroup
  },
  name: 'InputGroupCheckbox',
  inheritAttrs: false,
  props: inputProps,
  setup(props, context) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputGroupCheckbox.defaults)

    const { field } = useField<any>(props.name as string, props.rules, {
      required: props.required
    })

    const config = useConfig<InputGroupCheckboxConfig>({
      props,
    }, inject(VunixConfigSymbol))

    const multi = context.slots.default().filter(e => e.type === 'InputCheckbox').length > 1

    // Used by InputRadio child to update current modelValue
    // TODO: Handle case of input checkbox value object
    const updateModelValue = (value: any) => {
      const addValue = !!value.true
      let _value = addValue ? value.true : value.false

      if (multi) {
        let newValue = field.value.value

        // Normalize default value to array
        if (!Array.isArray(newValue)) {
          newValue = newValue ? [newValue] : []
        }

        // Add value
        if (addValue) {
          if (!newValue.includes(value)) newValue.push(_value)
        } else {
          const indexValue = newValue.indexOf(_value)

          if (indexValue !== -1) newValue.splice(indexValue, 1)
        }

        field.value.value = newValue
      } else {
        field.value.value = addValue
      }
    }

    return { updateModelValue, config, field }
  }
})
</script>