<template>
  <div class="flex flex-col gap-2 m-10">
    <VButton :to="{ name: 'test' }">Test update</VButton>
    <VInputText v-model="name" placeholder="Icon input placeholder" name="icon" leading="heroicons-solid:search"/>
    <VInputText v-model="name" placeholder="icon" name="icon">
      <template #leading>
        Kg
      </template>
    </VInputText>
    <VInputText v-model="name" placeholder="icon" name="icon" size="lg">
      <template #leading>
        Kg
      </template>
    </VInputText>
  </div>
</template>
  
<script setup>

import ArrowPathIcon from '@heroicons/vue/20/solid/esm/MagnifyingGlassIcon.js';

const icon = ArrowPathIcon

const name = ref('')
</script>