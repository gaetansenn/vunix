<template>
  <div :class="config.class">
    <div :class="config.wrapper.class">
      <input type="radio" v-model="modelValue" :value="$attrs.value || 'on'" :name="name" :id="id"
        :class="[config.wrapper.input.class, config.wrapper.input.size, config.wrapper.input.variant]"
        @change="onChange" />
      <label v-if="label" :for="id" :class="config.wrapper.label.class">{{ label }}</label>
    </div>
    <div v-if="$slots.bottom || description" :class="config.bottom.class">
      <slot name="bottom">
        {{ description }}
      </slot>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, getCurrentInstance, inject, ref } from 'vue';

import { useConfig } from '../../../../composables/config';
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputRadio.props'
import type { InputRadioConfig } from './InputRadio.config';
import { VunixConfigSymbol } from '../../../../symbols';
import { useId } from '../../composable';
import { useModelWrapper } from '../../../../composables/form/field';
import { getParentComponentByName } from '../../../../composables/vnode';

export default defineComponent({
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue'],
  async setup(props, context) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputRadio.defaults)

    const config = useConfig<InputRadioConfig>({
      props,
    }, inject(VunixConfigSymbol))

    // Get InputGroupRadio parent component
    const formInputGroupRadio = getParentComponentByName('InputGroupRadio', getCurrentInstance(), 2)

    // Used to force name of input if wrapped inside InputGroupRadio
    const name = formInputGroupRadio ? formInputGroupRadio.props.name : context.attrs.name
    const id = useId(context.attrs.id as string)
    const modelValue = formInputGroupRadio ? ref(formInputGroupRadio?.props?.modelValue) : useModelWrapper(props, context.emit, 'modelValue')
    // Watch for input radio change event
    const onChange = () => {
      // Send updated value if parent is formInputGroupRadio
      if (formInputGroupRadio) formInputGroupRadio?.ctx.updateModelValue(context.attrs.value)
    }

    return { config, props, id, name, modelValue, onChange }
  }
})
</script>
  