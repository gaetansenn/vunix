<template>
  <InputGroup :required="required" :description="description" :label="label" :optional-label="optionalLabel">
    <InputBase v-bind="boundProps" :trailing="eyeOff ? config.eye.off : config.eye.on"
      :type="eyeOff ? 'text' : 'password'" @trailing-click="onTrailingClick" @leading-click="$emit('leadingClick')">
      <template v-slot:leading>
        <slot name="leading" />
      </template>
      <template v-slot:heading>
        <slot name="heading" />
      </template>
    </InputBase>
  </InputGroup>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, useAttrs, ref, defineEmits } from 'vue';

import { useConfig } from '../../../../composables/config';
import InputBase from '../base/InputBase.vue'
import InputGroup from '../group/InputGroup.vue'
import { injectDefaultValues } from '@core/runtime/components/commons/props';
import { props as inputProps } from './InputPassword.props'
import { VunixConfigSymbol } from '@core/runtime/symbols';
import { useBindField, useField } from '@core/runtime/composables/forms/field';
import type { InputPasswordConfig } from './InputPassword.config';

export default defineComponent({
  components: {
    InputBase,
    InputGroup,
  },
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'trailingClick', 'leadingClick'],
  setup(props, { emit }) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputPassword.defaults)

    const config = useConfig<InputPasswordConfig>({
      props,
    }, inject(VunixConfigSymbol))
    const { field } = useField<string>(props.name as string, props.rules, {
      required: props.required
    })
    const boundProps = useBindField(field, props, useAttrs())
    const eyeOff = ref(false)

    const onTrailingClick = () => {
      emit('trailingClick')

      // Update eye state
      eyeOff.value = !eyeOff.value
    }

    return { boundProps, eyeOff, config, onTrailingClick }
  }
})
</script>
