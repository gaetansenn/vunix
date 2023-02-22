<template>
  <div :class="config.InputGroup.class">
    <div :class="config.InputGroup.label?.wrapper">
      <slot name="label">
        <label v-if="label" :class="[config.InputGroup.label?.class, config.InputGroup.label?.size]" :for="name">
          {{ label }}
          <span v-if="required && !props.optionalLabel" :class="config.InputGroup.label?.required">*</span>
        </label>
      </slot>
      <slot v-if="props.optionalLabel && !required" name="optional">
        <span :class="config.InputGroup.label?.optional">Optional</span>
      </slot>
    </div>
    <slot />
    <div :class="config.InputGroup.bottom?.class">
      <slot name="validation">
        <div :class="config.InputGroup.bottom?.validation?.class">
          <div>{{ validation?.field.errorMessage.value }}</div>
        </div>
      </slot>
      <slot v-if="!validation?.field.errors.value.length" name="description">
        <div :class="config.InputGroup.bottom?.description?.class">
          {{ props.description }}
        </div>
      </slot>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject } from 'vue';

import { useConfig } from '../../../../composables/config';
import { VunixConfigSymbol, VunixFieldSymbol } from '../../../../symbols'
import type { InputGroupConfig } from './InputGroup.config';
import { props as inputGroupProps } from './InputGroup.props'
import { injectDefaultValues } from '../../../commons/props';

interface Config {
  InputGroup: InputGroupConfig
}

const props = defineProps(inputGroupProps)
const validation = inject(VunixFieldSymbol)

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, inputGroupProps, inject(VunixConfigSymbol)?.InputGroup.defaults)

const config = useConfig<Config>({
  props,
}, inject(VunixConfigSymbol))

console.log('config gropu', config)
</script>