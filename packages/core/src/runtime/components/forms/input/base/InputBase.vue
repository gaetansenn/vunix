<template>
  <div :class="[config.InputBase.class, config.InputBase.variant, config.InputBase.rounded, config.InputBase.size, { 'focused': focused }]">
    <div v-if="props.leading || slots.leading" :class="config.InputBase.leading.class">
      <slot name="leading">
        <VIcon v-if="typeof props.leading === 'string'" :name="props.leading" :size="config.InputBase.leading.size" />
        <component v-else :is="props.leading" :class="[config.InputBase.leading.size]" />
      </slot>
    </div>
    <input ref="input" :type="props.type" :value="modelValue" @input="$emit('update:modelValue', handleInputChange($event))" :class="[config.InputBase.input.class]" :placeholder="placeholder" />
    <div v-if="props.trailing || slots.trailing" :class="config.InputBase.trailing.class">
      <slot name="trailing">
        <VIcon v-if="typeof props.trailing === 'string'" :name="props.trailing" :size="config.InputBase.trailing.size" />
        <component v-else :is="props.trailing" :class="[config.InputBase.trailing.size]" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, ref, useSlots } from 'vue';
import { useFocus } from '@vueuse/core';
import { useConfig } from '../../../../composables/config';

import { VunixConfigKey } from '../../../../utils/config';
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputBase.props'
import type { InputTextConfig } from '../text/InputText.config';

const props = defineProps(inputProps())

defineEmits(['update:modelValue'])

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigKey)?.InputBase.defaults)

const input = ref(null)
// TODO: Check if we keep useFocus 
const { focused } = useFocus(input)

const config = useConfig<InputTextConfig>({
  props,
  focused
}, inject(VunixConfigKey))

const slots = useSlots()

</script>
