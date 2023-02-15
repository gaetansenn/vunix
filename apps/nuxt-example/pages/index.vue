<template>
  <div class="flex flex-col gap-2 m-10">
    <!-- <VButton :to="{ name: 'test' }">Test update</VButton> -->
    <VInputText v-model="name" optional-label description="Ceci est une description"
      placeholder="Icon input placeholder" name="icon" leading="heroicons-solid:search" label="Input text"
      data-test="toto" required />
    <VInputPassword v-model="password" name="password" required />
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
const name = ref('')
const password = ref('')
</script>