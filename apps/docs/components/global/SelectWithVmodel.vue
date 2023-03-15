<template>
  <VSelect v-bind="$attrs" v-model="model" :options="newOptions" :value-key="valueKey">
    <ContentSlot :use="$slots.default" unwrap="div" />
  </VSelect>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    component: {
      type: String
    },
    options: {
      type: String,
      default: '[]'
    },
    valueKey: {
      type: String,
      default: undefined
    }
  },
  inheritAttrs: false,
  setup: (props) => {
    const model = ref('')

    const newOptions = JSON.parse(props.options.replaceAll('\'', '"'))

    return { model, newOptions }
  }
})
</script>