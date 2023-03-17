<template>
  <div class="flex flex-col gap-2 m-10">
    <VButton :to="{ name: 'test' }">Test update</VButton>
    <VInputEmail v-model="email" name="email" label="Email" placeholder="Provide email" />
    <VInputText v-model="name" optional-label description="Ceci est une description" placeholder="Icon input placeholder"
      name="icon" leading="heroicons-solid:search" label="Input text" data-test="toto" required size="sm" />
    <VInputPassword v-model="password" name="password" label="Password" required />
    <VInputText v-model="name" placeholder="icon" name="icon">
      <template #leading>
        Kg
      </template>
    </VInputText>
    <VInputText v-model="name" placeholder="icon" name="icon" size="lg">
      <template #trailing>
        Kg
      </template>
    </VInputText>
    <VTextArea v-model="textArea" placeholder="Placeholder to" label="Textarea test" name="textarea" required
      maxlength="50" />
    <VInputNumber v-model="number" placeholder="Number value" label="Number input" name="number" />
    <VInputText v-model="name" name="validation" required>
      <template #validation="slotProps">
        {{ slotProps.validation?.field.errorMessage.value }} 🔫
      </template>
    </VInputText>
    <VSelect v-model="select" size="md" required :options="optionsObject" name="Select" label="Select an animal" />
    <VInputRadio v-model="radio" name="radio" />
  </div>
</template>
  
<script setup>
const name = ref('')
const password = ref('')
const email = ref('')
const textArea = ref('')
const number = ref('')
const optionsObject = [{
  value: 'Dog',
  label: 'This is a dog'
}, {
  value: 'Cat',
  label: 'This is a cat'
}]
const select = ref(optionsObject[0])
const radio = ref('')
</script>