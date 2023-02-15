<template>
  <InputGroup :required="required" :description="description" :label="label" :optional-label="optionalLabel">
    <InputBase v-bind="boundProps">
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
import { defineComponent, getCurrentInstance, inject, useAttrs } from 'vue';

import { required } from '@vunix/rules'
import InputBase from '../base/InputBase.vue'
import InputGroup from '../group/InputGroup.vue'
import { useBindField, useField } from '../../../../composables/forms/field';
import { VunixConfigSymbol } from '../../../../symbols'
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputText.props'

export default defineComponent({
  components: {
    InputBase,
    InputGroup,
  },
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue', 'focus', 'blur'],
  setup(props) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputText.defaults)

    const { field } = useField<string>(props.name as string, props.rules || [])
    const boundProps = useBindField(field, props, useAttrs())

    return { boundProps }
  }
})
</script>
