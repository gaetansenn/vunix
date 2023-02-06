<template>
  <div>
    <VInputBase v-bind="_props">
      <template v-slot:leading>
        <slot name="leading" />
      </template>
      <template v-slot:heading>
        <slot name="heading" />
      </template>
    </VInputBase>
    field: {{ field }}
    meta: {{ meta }}
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject } from 'vue';
import { useBindField, useField } from '../../../../composables/forms/field';

import { VunixConfigKey } from '../../../../utils/config';
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputText.props'

const props = defineProps(inputProps)

defineEmits(['update:modelValue', 'focus', 'blur'])

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigKey)?.InputText.defaults)

const { field, meta } = useField<string>(props.name as string, props.rules)
const _props = useBindField(field, props)
</script>