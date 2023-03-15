<template>
  <div :class="config.FormGroup.class">
    <div :class="config.FormGroup.label?.wrapper">
      <slot name="label">
        <label v-if="label" :class="[config.FormGroup.label?.class, config.FormGroup.label?.size]" :for="name">
          {{ label }}
          <span v-if="required && !props.optionalLabel" :class="config.FormGroup.label?.required">*</span>
        </label>
      </slot>
      <slot v-if="props.optionalLabel && !required" name="optional">
        <span :class="config.FormGroup.label?.optional">Optional</span>
      </slot>
    </div>
    <slot />
    <div :class="config.FormGroup.bottom?.class">
      <slot name="validation" v-if="!validation?.meta.valid.value" :validation="validation">
        <div :class="config.FormGroup.bottom?.validation?.class">
          <div>{{ validation?.field.errorMessage.value }}</div>
        </div>
      </slot>
      <slot v-if="!validation?.field.errors.value.length" name="description">
        <div :class="config.FormGroup.bottom?.description?.class">
          {{ props.description }}
        </div>
      </slot>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject } from 'vue';

import { useConfig } from '../../../composables/config';
import { VunixConfigSymbol, VunixFieldSymbol } from '../../../symbols'
import type { FormGroupConfig } from './FormGroup.config';
import { props as FormGroupProps } from './FormGroup.props'
import { injectDefaultValues } from '../../commons/props';

interface Config {
  FormGroup: FormGroupConfig
}

const props = defineProps(FormGroupProps)
const validation = inject(VunixFieldSymbol)

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, FormGroupProps, inject(VunixConfigSymbol)?.FormGroup.defaults)

const config = useConfig<Config>({
  props,
}, inject(VunixConfigSymbol))
</script>