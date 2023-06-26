<template>
  <Teleport to="body" :disabed="!appendToBody">
    <!-- <Suspense> -->
    <ConfigTransition :config="config.overlay.transition" appear>
      <div v-show="open" :class="config.overlay.class" tabindex="0">
        <div :class="config.wrapper">
          <div :class="config.backdrop.wrapper">
            <div :class="config.backdrop.class" @click="!preventClose && close()" />
          </div>
          <ConfigTransition appear :config="config.modal.transition">
            <div v-show="open" :class="[config.modal.wrapper, config.modal.rounded]">
              <div v-if="!hideClose" :class="config.modal.header.close.class">
                <slot name="close">
                  <Icon v-if="typeof config.modal.header.close.icon === 'string'" :name="config.modal.header.close.icon"
                    :size="config.modal.header.close.size" @click="close" />
                </slot>
              </div>
              <div v-if="$slots.header || header" :class="config.modal.header.class">
                <slot name="header">
                  {{ header }}
                </slot>
              </div>
              <div :class="config.modal.content.class">
                <slot />
              </div>
              <div v-if="$slots.footer" :class="config.modal.footer.class">
                <slot name="footer" />
              </div>
            </div>
          </ConfigTransition>
        </div>
      </div>
    </ConfigTransition>
    <!-- </Suspense> -->
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, inject } from 'vue';

import ConfigTransition from '../../transitions/config/ConfigTransition.vue';
import Icon from '../../icon/Icon.vue'

import { props as modalProps } from './Modal.props'
import type { ModalConfig } from './Modal.config';
import { injectDefaultValues } from '../../commons/props';
import { VunixConfigSymbol } from '../../../symbols'
import { useConfig } from '../../../composables/config';

export default defineComponent({
  components: {
    ConfigTransition,
    Icon
  },
  props: modalProps,
  emits: ['close', 'update:modelValue'],
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
        if (!props.scrollBody) {
          if (props.modelValue) document.body.classList.add('overflow-hidden')
          else document.body.classList.remove('overflow-hidden')
        }

        return props.modelValue
      },
      set(open) {
        if (!open) emit('close')

        emit('update:modelValue', open)
      }
    })

    const close = () => {
      open.value = false
    }

    return { config, open, close }
  }
})
</script>