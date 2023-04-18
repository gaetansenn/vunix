<template>
  <Transition v-bind="propsBind">
    <slot />
  </Transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { props } from './ConfigTransition.props'

export default defineComponent({
  props,
  setup(props) {
    const propsBind = computed(() => {
      const { config, ...otherProps } = props

      return {
        ...otherProps,
        'enter-active-class': config?.enter?.fixed,
        'enter-from-class': config?.enter?.from,
        'enter-to-class': config?.enter?.to,
        'leave-active-class': config?.leave?.fixed,
        'leave-from-class': config?.leave?.from,
        'leave-to-class': config?.leave?.to,
        'on-before-enter': config?.onAfterEnter,
        'on-enter': config?.onEnter,
        'on-after-enter:': config?.onAfterEnter,
        'on-enter-cancelled': config?.onEnterCancelled,
        'on-before-leave': config?.onBeforeLeave,
        'on-leave': config?.onLeave,
        'on-after-leave': config?.onAfterLeave,
        'on-leave-cancelled': config?.onLeaveCancelled
      }
    })

    return { propsBind }
  },
})
</script>