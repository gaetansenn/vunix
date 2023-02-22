<template>
  <div class="flex flex-col gap-2 m-10">
    <VButton :to="{ name: 'test' }">Test update</VButton>
    <VInputEmail v-model="email" name="email" label="Email" placeholder="Provide email" disabled />
    <VInputText v-model="name" optional-label description="Ceci est une description" placeholder="Icon input placeholder"
      name="icon" leading="heroicons-solid:search" label="Input text" data-test="toto" required disabled />
    <VInputPassword v-model="password" name="password" label="Password" required />
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
    <VTextArea v-model="textArea" placeholder="Placeholder to" label="Textarea test" name="textarea" required
      maxlength="50" />
    <VInputNumber v-model="number" placeholder="Number value" label="Number input" name="number" />
  </div>
</template>
  
<script setup>
const name = ref('')
const password = ref('')
const email = ref('')
const textArea = ref('')
const number = ref('')
</script>