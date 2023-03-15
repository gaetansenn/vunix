<template>
  <VSelect v-bind="$attrs" v-model="model" :options="newOptions">
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