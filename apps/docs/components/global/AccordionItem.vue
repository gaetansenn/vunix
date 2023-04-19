<template>
  <div class="flex flex-col">
    <VAccordionItem v-model="expanded" header="Click here to see my home">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </VAccordionItem>
  </div>
</template>

<script setup>
const expanded = ref(false)
</script>