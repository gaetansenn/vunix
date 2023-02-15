<template>
  <div
    :class="[config.InputBase.class, config.InputBase.variant, config.InputBase.rounded, config.InputBase.size, { 'focused': focused }]">
    <div v-if="leadingIcon || slots.leading" :class="config.InputBase.leading.class">
      <slot name="leading">
        <Icon v-if="typeof leadingIcon === 'string'" :name="leadingIcon" :size="(config.InputBase.leading.size as any)"
          @click="$emit('leadingClick')" />
        <component v-else :is="props.leading" :class="[config.InputBase.leading.size]" @click="$emit('leadingClick')" />
      </slot>
    </div>
    <input ref="input" v-bind="$attrs" :type="props.type" :value="modelValue" :class="[config.InputBase.input.class]"
      :placeholder="placeholder" @input="$emit('update:modelValue', handleInputChange($event))"
      @blur="$emit('blur', $event)" @focus="$emit('focus', $event)" />
    <div v-if="trailingIcon || slots.trailing" :class="config.InputBase.trailing.class">
      <slot name="trailing">
        <Icon v-if="typeof trailingIcon === 'string'" :name="trailingIcon"
          :size="(config.InputBase.trailing.size as any)" @click="$emit('trailingClick')" />
        <component v-else :is="props.trailing" :class="[config.InputBase.trailing.size]"
          @click="$emit('trailingClick')" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, ref, useSlots, computed } from 'vue';
import { useFocus } from '@vueuse/core';

import { useConfig } from '../../../../composables/config';
import Icon from '../../../icon/Icon.vue'
import { VunixConfigSymbol } from '../../../../symbols'
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputBase.props'
import type { InputBaseConfig } from './InputBase.config';

interface Config {
  InputBase: InputBaseConfig
}

export default defineComponent({
  components: {
    Icon
  },
  props: inputProps(),
  inheritAttrs: false,
  emits: ['update:modelValue', 'focus', 'blur', 'trailingClick', 'leadingClick'],
  setup(props) {
    const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value

    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigSymbol)?.InputBase.defaults)

    const input = ref(null)
    // TODO: Check if we keep useFocus 
    const { focused } = useFocus(input)

    const config = useConfig<Config>({
      props,
      focused
    }, inject(VunixConfigSymbol))

    const leadingIcon = computed(() => {
      return props.leading || config.InputBase.leading.icon
    })

    const trailingIcon = computed(() => {
      return props.trailing || config.InputBase.trailing.icon
    })

    console.log(trailingIcon)

    return { config, props, slots: useSlots(), handleInputChange, focused, input, leadingIcon, trailingIcon }
  }
})
</script>
