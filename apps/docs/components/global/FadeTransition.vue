<template>
  <div class="inline-flex flex-col gap-4">
    <VFadeTransition>
      <div v-show="show">
        <ContentSlot :use="$slots.default" unwrap="p" />
      </div>
    </VFadeTransition>
    <VButton @click="show = !show">Click to {{ show ? 'hide' : 'show' }}</VButton>
  </div>
</template>

<script setup>
const show = ref(false)
</script>