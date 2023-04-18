<template>
  <div :class="config.class">
    <div :class="config.wrapper.class">
      <input type="checkbox" v-model="modelValue" :value="$attrs.value || 'on'" :name="name" :id="id"
        :class="[config.wrapper.input.class, config.wrapper.input.size, config.wrapper.input.variant]"
        @change="onChange" />
      <label :for="id" :class="config.wrapper.checked.class">
        <slot v-if="$slots.checked || config.wrapper.checked.icon" name="checked">
          <Icon v-if="typeof config.wrapper.checked.icon === 'string'" :name="config.wrapper.checked.icon"
            :size="config.wrapper.checked.size" />
          <component v-else :is="config.wrapper.checked.icon" :class="[config.wrapper.checked.size]" />
        </slot>
      </label>
      <label :for="id" :class="config.wrapper.indeterminate.class">
        <slot v-if="$slots.indeterminate || config.wrapper.indeterminate.icon" name="indeterminate">
          <Icon v-if="typeof config.wrapper.indeterminate.icon === 'string'" :name="config.wrapper.indeterminate.icon"
            :size="config.wrapper.indeterminate.size" />
          <component v-else :is="config.wrapper.indeterminate.icon" :class="[config.wrapper.indeterminate.size]" />
        </slot>
      </label>
      <label v-if="label" :for="id" :class="config.wrapper.label.class">
        {{ label }}
      </label>
    </div>
    <div v-if="$slots.bottom || description" :class="config.bottom.class">
      <slot name="bottom">
        {{ description }}
      </slot>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, getCurrentInstance, inject, ref } from 'vue';

import Icon from '../../../icon/Icon.vue'
import { useConfig } from '../../../../composables/config';
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputCheckbox.props'
import type { InputCheckboxConfig } from './InputCheckbox.config';
import { VunixConfigSymbol } from '../../../../symbols';
import { useModelWrapper } from '../../../../composables/form/field';
import { getParentComponentByName, useId } from '../../../../composables/vnode';

export default defineComponent({
  name: 'InputCheckbox',
  components: {
    Icon
  },
  inheritAttrs: false,
  props: inputProps,
  emits: ['update:modelValue'],
  async setup(props, context) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputRadio.defaults)

    const config = useConfig<InputCheckboxConfig>({
      props,
    }, inject(VunixConfigSymbol))

    // Get InputGroupRadio parent component
    const formInputCheckbox = getParentComponentByName('InputGroupCheckbox', getCurrentInstance(), 2)

    // Used to force name of input if wrapped inside InputGroupCheckbox
    const name = formInputCheckbox ? formInputCheckbox.props.name : context.attrs.name
    const id = useId('v-form-', context.attrs.id as string)
    const modelValue = formInputCheckbox ? ref(formInputCheckbox?.props?.modelValue) : useModelWrapper(props, context.emit, 'modelValue')

    // Checked clicked
    const onChecked = () => {
      modelValue.value = !modelValue.value
    }
    // Watch for input radio change event
    const onChange = () => {
      // Send updated value if parent is formInputCheckbox
      if (formInputCheckbox) formInputCheckbox?.ctx.updateModelValue(modelValue.value ? { true: context.attrs.value } : { false: context.attrs.value })
    }

    return { config, props, id, name, modelValue, onChange, onChecked }
  }
})
</script>
  