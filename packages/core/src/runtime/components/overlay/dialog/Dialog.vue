<template>
  <Modal v-model="modelValue" root-path="Dialog">
    <template #header>
      <slot name="title">
        {{ title }}
      </slot>
    </template>
    <template #default>
      <slot />
    </template>
    <template #footer>
      <VButton v-if="submit" :focus="modelValue" :loading="ongoing.submit" :disabled="ongoing.cancel || ongoing.submit"
        :class="config.button.submit.fixed" :variant="config.button.submit.variant" block @click.native="validate">
        <slot name="submit">
          {{ submit }}
        </slot>
      </VButton>
      <VButton v-if="cancel" :variant="config.button.cancel.variant" :disabled="ongoing.cancel || ongoing.submit"
        :class="config.button.cancel.fixed" block :loading="ongoing.cancel" @click.native="cancelAction">
        <slot name="cancel">
          {{ cancel }}
        </slot>
      </VButton>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, reactive } from 'vue';

import Modal from '../../overlay/modal/Modal.vue'

import { props as dialogProps } from './Dialog.props'
import type { DialogConfig } from './Dialog.config';
import { injectDefaultValues } from '../../commons/props';
import { VunixConfigSymbol } from '../../../symbols';
import { useConfig } from '../../../composables/config';
import { useModelWrapper } from '../../../composables/form/field';

export default defineComponent({
  components: {
    Modal,
  },
  props: dialogProps,
  emits: ['cancel', 'update:modelValue'],
  setup(props, { emit }) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, dialogProps, inject(VunixConfigSymbol)?.Dialog.defaults)

    const modelValue = useModelWrapper(props, emit, 'modelValue')
    const config = useConfig<DialogConfig>({
      props
    }, inject(VunixConfigSymbol))
    const ongoing = reactive({
      submit: false,
      cancel: false
    })

    const validate = async () => {
      if (!modelValue) return

      if (typeof props.onSubmit === 'function') {
        ongoing.submit = true

        await props.onSubmit(this)
        ongoing.submit = false
        modelValue.value = false
      } else modelValue.value = false
    }
    const cancelAction = () => {
      if (props.onCancel) props.onCancel()

      modelValue.value = false
      emit('cancel')
    }

    return { config, modelValue, ongoing, validate, cancelAction }
  }
})
</script>