import { App, createTextVNode, ref, nextTick, getCurrentInstance, reactive, Ref, Suspense, h, Slot, createVNode, createBlock, withCtx, normalizeProps, guardReactiveProps } from 'vue'

import Dialog from './Dialog.vue'
import { mount } from '../../../utils/vue'

export interface DialogPlugin {
  title: string // Title of the dialog
  body?: string // Content of the dialog
  cancel: string // cancel label of the dialog
  submit: string // submit label of the dialog
  onClose?: () => void // Method to be called on close
  onSubmit?: () => void // Method to be called on submit
}

export interface DialogProps extends DialogPlugin {
  'onUpdate:modelValue'?: (value: boolean) => void,
  modelValue?: boolean
}

const defaultValue = () => ({
    title: '',
    cancel: 'Cancel',
    submit: 'Submit',
    onClose: () => {},
    onSubmit: () => {},
    modelValue: false // the v-show value
})

export default {
  install: (app: App) => {
    const props: Ref<DialogProps> = ref(defaultValue())
    const slots = ref({
      default: () => ''
    })

    mount(Dialog, app, props, slots)

    // Inject plugin to vue
    app.config.globalProperties.$dialog = (newProps: DialogPlugin) => {
      const { body, ..._props } = newProps

      props.value = { ...defaultValue(), ..._props }

      // Display dialog
      props.value.modelValue = true

      // Simulate v-model emit value to update props
      props.value['onUpdate:modelValue'] = (value: boolean) => {
        props.value.modelValue = value
      }
    }
  }
}