<template>
  <FormGroup :config="props.config" :config-path="props.configPath" :root-path="props.rootPath" :required="required"
    :description="description" :label="label" :optional-label="optionalLabel" :id="id">
    <InputBase v-model="field.value.value" v-bind="boundProps" :trailing="eyeOff ? config.eye.off : config.eye.on"
      :type="eyeOff ? 'text' : 'password'" :id="id" @trailing-click="onTrailingClick"
      @leading-click="$emit('leadingClick')">
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
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, useAttrs, ref } from 'vue';

import { useConfig } from '../../../../composables/config';
import InputBase from '../base/InputBase.vue'
import FormGroup from '../../group/FormGroup.vue'
import { injectDefaultValues } from '../../../../components/commons/props';
import { props as inputProps } from './InputPassword.props'
import { VunixConfigSymbol } from '../../../../symbols';
import { useBindInputField, useField } from '../../../../composables/form/field';
import type { InputPasswordConfig } from './InputPassword.config';
import { useId } from '../../composable';

export default defineComponent({
  components: {
    InputBase,
    FormGroup,
  },
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'trailingClick', 'leadingClick'],
  setup(props, { emit, attrs }) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputPassword.defaults)

    const config = useConfig<InputPasswordConfig>({
      props,
    }, inject(VunixConfigSymbol))
    const { field } = useField<string>(props.name as string, props.rules, {
      required: props.required
    })
    const boundProps = useBindInputField(field, props, useAttrs())
    const id = useId(attrs.id as string)
    const eyeOff = ref(false)

    const onTrailingClick = () => {
      emit('trailingClick')

      // Update eye state
      eyeOff.value = !eyeOff.value
    }

    return { boundProps, eyeOff, config, onTrailingClick, props, field, id }
  }
})
</script>
