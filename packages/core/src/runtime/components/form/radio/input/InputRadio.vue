<template>
  <div :class="config.class">
    <div :class="config.wrapper.class">
      <input type="radio" v-bind="boundProps" :id="id"
        :class="[config.wrapper.input.class, config.wrapper.input.size, config.wrapper.input.variant]" />
      <label :for="id" :class="config.wrapper.label.class">Label</label>
    </div>
    <slot name="bottom">
      <div :class="config.bottom.class">
        Help or instructions
      </div>
    </slot>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, getCurrentInstance, inject } from 'vue';

import { useConfig } from '../../../../composables/config';
import { injectDefaultValues } from '@core/runtime/components/commons/props';
import { props as inputProps } from './InputRadio.props'
import type { InputRadioConfig } from './InputRadio.config';
import { VunixConfigSymbol } from '@core/runtime/symbols';
import { useField, useBindInputField } from '@core/runtime/composables/form/field';
import { useId } from '../../composable';

export default defineComponent({
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'trailingClick', 'leadingClick'],
  async setup(props, context) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputRadio.defaults)

    const handleChange = (event: Event) => (event.target as HTMLInputElement).value

    const config = useConfig<InputRadioConfig>({
      props,
    }, inject(VunixConfigSymbol))

    const { field } = useField<string>(context.attrs.name as string, [...(props.rules || [])], {
      required: !!context.attrs.required,
    })
    const boundProps = useBindInputField(field, props, context.attrs)
    const id = useId(context.attrs.id as string)

    return { handleChange, config, props, field, boundProps, id }
  }
})
</script>
  