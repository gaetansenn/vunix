<template>
  <ConfigTransition :config="config.overlay.transition" appear>
    <div v-show="open" :class="config.overlay.class" tabindex="0">
      <div :class="config.wrapper">
        <div :class="config.backdrop.wrapper">
          <div :class="config.backdrop.class" @click="close" />
        </div>
        <ConfigTransition appear :config="config.modal.transition">
          <div v-show="open" :class="config.modal.wrapper">
            Modal content
          </div>
        </ConfigTransition>
      </div>
    </div>
  </ConfigTransition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import ConfigTransition from '../../transitions/config/ConfigTransition.vue';
import { getCurrentInstance, inject } from 'vue';

import { props as modalProps } from './Modal.props'
import type { ModalConfig } from './Modal.config';
import { injectDefaultValues } from '../../commons/props';
import { VunixConfigSymbol } from '../../../symbols'
import { useConfig } from '../../../composables/config';

export default defineComponent({
  components: {
    ConfigTransition
  },
  props: modalProps,
  setup(props, { emit }) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, modalProps, inject(VunixConfigSymbol)?.Modal.defaults)

    const config = useConfig<ModalConfig>({
      props
    }, inject(VunixConfigSymbol))

    const open = computed({
      get() {
        // disable-next-line
        if (process.server) return props.modelValue
        // // Change body attr
        if (props.modelValue) document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden')

        return props.modelValue
      },
      set(open) {
        if (!open) emit('close')

        emit('update:modelValue', open)
      }
    })

    const close = () => {
      if (!props.preventClose) open.value = false
    }

    return { config, open, close }
  }
})
</script>