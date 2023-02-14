<template>
  <div
    :class="[config.InputBase.class, config.InputBase.variant, config.InputBase.rounded, config.InputBase.size, { 'focused': focused }]">
    <div v-if="props.leading || slots.leading" :class="config.InputBase.leading.class">
      <slot name="leading">
        <Icon v-if="typeof props.leading === 'string'" :name="props.leading"
          :size="config.InputBase.leading.size as any" />
        <component v-else :is="props.leading" :class="[config.InputBase.leading.size]" />
      </slot>
    </div>
    <input ref="input" v-bind="$attrs" :type="props.type" :value="modelValue" :class="[config.InputBase.input.class]"
      :placeholder="placeholder" @input="$emit('update:modelValue', handleInputChange($event))"
      @blur="$emit('blur', $event)" @focus="$emit('focus', $event)" />
    <div v-if="props.trailing || slots.trailing" :class="config.InputBase.trailing.class">
      <slot name="trailing">
        <Icon v-if="typeof props.trailing === 'string'" :name="props.trailing"
          :size="config.InputBase.trailing.size as any" />
        <component v-else :is="props.trailing" :class="[config.InputBase.trailing.size]" />
      </slot>
    </div>
  </div>
</template>

<!-- <script lang="ts">
export default {
  inheritAttrs: false
}
</script> -->

<script setup lang="ts">
import { getCurrentInstance, inject, ref, useSlots } from 'vue';
import { useFocus } from '@vueuse/core';
import { useConfig } from '../../../../composables/config';

import Icon from '../../../icon/Icon.vue'
import { VunixConfigSymbol } from '../../../../symbols'
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputBase.props'
import type { InputTextConfig } from '../text/InputText.config';

const props = defineProps(inputProps())

defineEmits(['update:modelValue', 'focus', 'blur'])

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputBase.defaults)

const input = ref(null)
// TODO: Check if we keep useFocus 
const { focused } = useFocus(input)

const config = useConfig<InputTextConfig>({
  props,
  focused
}, inject(VunixConfigSymbol))

const slots = useSlots()
</script>
