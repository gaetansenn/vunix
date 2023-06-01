<template>
  <VModal v-model="opened" :header="header" rounded="lg">
    <template v-if="$slots.header" #header>
      <ContentSlot :use="$slots.header" unwrap="p" />
    </template>
    <ContentSlot :use="$slots.default" unwrap="p" />
    <template v-if="$slots.footer" #footer>
      <ContentSlot :use="$slots.footer" unwrap="p" />
    </template>
  </VModal>
  <VButton @click="opened = !opened">Open modal</VButton>
</template>

<script lang="ts" setup>
defineProps({
  header: {
    type: String,
  }
})

const opened = ref(false)
</script>