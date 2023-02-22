<template>
  <VTextArea v-bind="$attrs" v-model="model">
    <ContentSlot :use="$slots.default" unwrap="div" />
  </VTextArea>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    component: {
      type: String
    }
  },
  inheritAttrs: false,
  setup: () => {
    const model = ref('')

    return { model }
  }
})
</script>