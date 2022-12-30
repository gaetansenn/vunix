<template>
  <h2 class="text-blue-400 font-medium mb-5">Using size prop</h2>
  <div class="inline-flex items-start space-x-2">
    <component v-for="size in sizes" :is="component" :size="size">
      {{ name }} {{ size }}
    </component>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: null
  },
  component: {
    type: String,
    required: true
  }
})

const { $vunix } = useNuxtApp()
const name = props.name || props.component
const sizes = computed(() => Object.keys($vunix?.config.Button.sizes || []))
</script>