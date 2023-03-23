<template>
  <VInputGroupRadio v-bind="$attrs" v-model="model">
    <ContentSlot :use="$slots.default" unwrap="div">
      <VInputRadio :value="false" label="No" />
      <VInputRadio :value="true" label="Yes" />
    </ContentSlot>
  </VInputGroupRadio>
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