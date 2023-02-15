<template>
  <div :class="config.class">
    <div :class="config.label.wrapper">
      <slot name="label">
        <label v-if="label" :class="[config.label.class, config.label.size]" :for="name">
          {{ label }}
          <span v-if="required && !props.optionalLabel" :class="config.label.required">*</span>
        </label>
      </slot>
      <slot v-if="props.optionalLabel && !required" name="optional">
        <span :class="config.label.optional">Optional</span>
      </slot>
    </div>
    <slot />
    <slot name="validation">
      <div :class="config.validation.class">
        {{ validation?.field.errorMessage.value }}
      </div>
    </slot>
    <slot v-if="!validation?.field.errors.value.length" name="description">
      <div :class="config.description.class">
        {{ props.description }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject } from 'vue';

import { useConfig } from '../../../../composables/config';
import { VunixConfigSymbol, VunixFieldSymbol } from '../../../../symbols'
import type { InputGroupConfig } from './InputGroup.config';
import { props as inputGroupProps } from './InputGroup.props'
import { injectDefaultValues } from '../../../commons/props';

const props = defineProps(inputGroupProps)
const validation = inject(VunixFieldSymbol)

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, inputGroupProps, inject(VunixConfigSymbol)?.InputGroup.defaults)

const config = useConfig<InputGroupConfig>({
  props,
}, inject(VunixConfigSymbol))
</script>