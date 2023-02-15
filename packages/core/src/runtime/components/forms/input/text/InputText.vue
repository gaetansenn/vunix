<template>
  <InputGroup :required="required" :description="props.description" :label="props.label" :optional-label="props.optionalLabel">
    <InputBase v-bind="_props">
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
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { getCurrentInstance, inject, useAttrs } from 'vue';

import { required } from '@vunix/rules'
import InputBase from '../base/InputBase.vue'
import InputGroup from '../group/InputGroup.vue'
import { useBindField, useField } from '../../../../composables/forms/field';
import { VunixConfigSymbol } from '../../../../symbols'
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputText.props'

const props = defineProps(inputProps)

defineEmits(['update:modelValue', 'focus', 'blur'])

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputText.defaults)

const { field } = useField<string>(props.name as string, props.rules || [])
const _props = useBindField(field, props, useAttrs())
</script>