<template>
  <component v-bind="$attrs" :is="component" v-model="model">
    <ContentSlot :use="$slots.default" unwrap="div" />
    <template #leading>
      <slot name="leading" />
    </template>
    <template #trailing>
      <slot name="trailing" />
    </template>
    <template #validation="{ validation }">
      <slot name="validation" :validation="validation" />
    </template>
  </component>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    component: {
      type: String
    }
  },
  inheritAttrs: false,
  setup: (props) => {
    const model = ref(props.component === 'VInputNumber' ? undefined : '')

    return { model }
  }
})
</script>