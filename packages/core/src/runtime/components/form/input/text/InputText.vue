<template>
  <FormGroup :config="props.config" :config-path="props.configPath" :root-path="props.rootPath" :required="required"
    :description="description" :label="label" :optional-label="optionalLabel" :id="id">
    <InputBase v-model="field.value.value" v-bind="boundProps" :id="id" @trailing-click="$emit('trailingClick')"
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
import { defineComponent, getCurrentInstance, inject, useAttrs } from 'vue';

import InputBase from '../base/InputBase.vue'
import FormGroup from '../../group/FormGroup.vue'
import { injectDefaultValues } from '@core/runtime/components/commons/props';
import { props as inputProps } from './InputText.props'
import { VunixConfigSymbol } from '@core/runtime/symbols';
import { useBindInputField, useField } from '@core/runtime/composables/form/field';
import { useId } from '../../composable';

export default defineComponent({
  components: {
    InputBase,
    FormGroup,
  },
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur', 'trailingClick', 'leadingClick'],
  setup(props, { attrs }) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputText.defaults)

    const { field } = useField<string>(props.name as string, props.rules, {
      required: props.required
    })
    const boundProps = useBindInputField(field, props, useAttrs())
    const id = useId(attrs.id as string)

    return { boundProps, props, field, id }
  }
})
</script>
