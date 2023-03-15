<template>
  <FormGroup :config="props.config" :config-path="props.configPath" :root-path="props.rootPath" :required="required"
    :description="description" :label="label" :optional-label="optionalLabel">
    <select v-model="field.value.value" v-bind="$attrs" @change="field.onChange($event)" @blur="field.onBlur($event)"
      @focus="field.onFocus($event)"
      :class="[config.rounded, config.size, config.class, config.variant, config.carret?.class, config.carret?.size]"
      :style="style">
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="option in newOptions" :value="option.value">
        <slot :option="option">
          {{ option.label }}
        </slot>
      </option>
    </select>
  </FormGroup>
</template>
  
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject } from 'vue';

import FormGroup from '../group/FormGroup.vue'
import { useConfig } from '../../../composables/config';
import { injectDefaultValues } from '@core/runtime/components/commons/props';
import { props as selectProps } from './Select.props'
import type { SelectConfig } from './Select.config';
import { VunixConfigSymbol } from '@core/runtime/symbols';
import { useField } from '@core/runtime/composables/form/field';
import type { Object } from '../../../utils/types'
import { useCarret } from './Select.composable'

interface Option {
  label: string,
  value: Object<any> | string | number
}

export default defineComponent({
  components: {
    FormGroup,
  },
  inheritAttrs: false,
  props: selectProps,
  emits: ['update:modelValue', 'focus', 'blur'],
  async setup(props) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, selectProps, inject(VunixConfigSymbol)?.Select.defaults)

    const handleChange = (event: Event) => (event.target as HTMLInputElement).value

    const config = useConfig<SelectConfig>({
      props,
    }, inject(VunixConfigSymbol))
    const { field } = useField<string>(props.name as string, [...(props.rules || [])], {
      required: props.required,
      isSelect: true
    })
    const { style } = await useCarret(config)
    const newOptions = computed(() => {
      return props.options?.map((option: any) => ({
        label: typeof option === 'object' ? option[props.labelKey] : option,
        value: typeof option === 'object' ? (props.valueKey ? option[props.valueKey] : option) : option
      }))
    })

    return { handleChange, config, props, style, newOptions, field }
  }
})
</script>
  