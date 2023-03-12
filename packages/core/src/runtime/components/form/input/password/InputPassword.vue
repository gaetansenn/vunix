<template>
  <InputGroup :config="props.config" :config-path="props.configPath" :root-path="props.rootPath" :required="required"
    :description="description" :label="label" :optional-label="optionalLabel">
    <InputBase v-model="field.value.value" v-bind="boundProps" :trailing="eyeOff ? config.eye.off : config.eye.on"
      :type="eyeOff ? 'text' : 'password'" @trailing-click="onTrailingClick" @leading-click="$emit('leadingClick')">
      <template v-slot:leading>
        <slot name="leading" />
      </template>
      <template v-slot:trailing>
        <slot name="trailing" />
      </template>
    </InputBase>
    <template #validation="{ validation }">
      <slot name="validation" :validation="validation" />
    </template>
  </InputGroup>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, useAttrs, ref } from 'vue';

import { useConfig } from '../../../../composables/config';
import InputBase from '../base/InputBase.vue'
import InputGroup from '../group/InputGroup.vue'
import { injectDefaultValues } from '@core/runtime/components/commons/props';
import { props as inputProps } from './InputPassword.props'
import { VunixConfigSymbol } from '@core/runtime/symbols';
import { useBindInputField, useField } from '@core/runtime/composables/form/field';
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
    const boundProps = useBindInputField(field, props, useAttrs())
    const eyeOff = ref(false)

    const onTrailingClick = () => {
      emit('trailingClick')

      // Update eye state
      eyeOff.value = !eyeOff.value
    }

    return { boundProps, eyeOff, config, onTrailingClick, props, field }
  }
})
</script>