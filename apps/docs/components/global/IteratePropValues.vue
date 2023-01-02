<template>
  <div class="inline-flex items-start space-x-2">
    <component v-for="value in values" :is="component" v-bind="value.bind">
      {{ label }} {{ value.__label }}
    </component>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  component: {
    type: String,
    required: true
  },
  valuesKey: {
    type: String,
  },
  valueKey: {
    type: String
  },
  values: {
    type: String,
    default: undefined
  }
})

const { $vunix } = useNuxtApp()
const label = props.label || props.component
const attrs = useAttrs()

const values = computed(() => (props.values ? JSON.parse(props.values.replaceAll('\'', '"')) : Object.keys($vunix?.config[props.component.replace('V', '')][props.valuesKey] || [])).map((key) => ({
  bind: {
    [`${props.valueKey}`]: key,
    ...attrs,
  },
  __label: key
})))
</script>