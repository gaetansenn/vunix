<template>
  <VCard :header="header" :collapse="!!collapse">
    <template v-if="$slots.header" #header>
      <ContentSlot :use="$slots.header" unwrap="p" />
    </template>
    <ContentSlot :use="$slots.default" unwrap="p" />
    <template v-if="$slots.footer" #footer>
      <ContentSlot :use="$slots.footer" unwrap="p" />
    </template>
  </VCard>
</template>

<script setup>
defineProps({
  header: {
    type: String
  },
  collapse: {
    type: String,
    default: ''
  }
})
</script>