<template>
  <div class="flex flex-col">
    <VCollapseTransition>
      <div v-show="show">
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
    </VCollapseTransition>
    <VButton @click="show = !show" class="mt-4">Toggle</VButton>
  </div>
</template>

<script setup>
const show = ref(false)
</script>