<template>
  <div class="inline-flex items-start space-x-2">
    <component v-for="value in values" :is="component" v-bind="value.bind">
      {{ name }} {{ value.__label }}
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
const name = props.name || props.component

const values = computed(() => (props.values ? JSON.parse(props.values.replaceAll('\'', '"')) : Object.keys($vunix?.config[props.component.replace('V', '')][props.valuesKey] || [])).map((key) => ({
  bind: {
    [`${props.valueKey}`]: key
  },
  __label: key
})))
</script>