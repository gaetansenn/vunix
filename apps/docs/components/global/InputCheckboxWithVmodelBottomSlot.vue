<template>
  <VInputCheckbox v-bind="$attrs" v-model="model">
    <ContentSlot :use="$slots.default" unwrap="div" />
    <template #bottom>
      Bottom slot 😎
    </template>
  </VInputCheckbox>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    component: {
      type: Boolean
    }
  },
  inheritAttrs: false,
  setup: () => {
    const model = ref('')

    return { model }
  }
})
</script>