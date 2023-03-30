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

import { injectDefaultValues } from '../../../../components/commons/props';
import { useField } from '../../../../composables/form/field';
import { props as inputProps } from './InputGroupRadio.props'
import { VunixConfigSymbol } from '../../../../symbols';
import FormGroup from '../../group/FormGroup.vue'
import { useConfig } from '../../../../composables/config';
import type { InputGroupRadioConfig } from './InputGroupRadio.config';

export default defineComponent({
  components: {
    FormGroup
  },
  name: 'InputGroupRadio',
  inheritAttrs: false,
  props: inputProps,
  setup(props, context) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputGroupRadio.defaults)

    const { field } = useField<string>(props.name as string, props.rules, {
      required: props.required
    })

    const config = useConfig<InputGroupRadioConfig>({
      props,
    }, inject(VunixConfigSymbol))

    // Used by InputRadio child to update current modelValue
    // TODO: Find another way to update the value
    const updateModelValue = (value: any) => {
      field.value.value = value
    }

    return { updateModelValue, config, field }
  }
})
</script>