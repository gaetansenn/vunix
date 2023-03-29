<template>
  <VInputGroupCheckbox v-bind="$attrs" v-model="model">
    <ContentSlot :use="$slots.default">
      <VInputCheckbox value="dog" label="I have a dog" />
      <VInputCheckbox value="cat" label="I have a cat" />
    </ContentSlot>
  </VInputGroupCheckbox>
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