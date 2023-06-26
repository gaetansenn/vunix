<template>
  <div class="flex flex-col gap-2 m-10 dark:text-white">
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
    <VInputGroupRadio v-model="radio" name="test" label="InputGroupRadio" required>
      <VInputRadio :value="ouiok" label="Oui" />
      <VInputRadio :value="nonok" label="Non" />
    </VInputGroupRadio>

    <VInputGroupCheckbox v-model="checkbox" label="Multiple values" required>
      <VInputCheckbox value="chien" label="chien" />
      <VInputCheckbox value="chat" label="chat" />
    </VInputGroupCheckbox>
    <VFadeTransition name="test">
      <div v-if="test">Transition with fade</div>
    </VFadeTransition>
    <VButton @click="test = !test">Click to show</VButton>
    <VButton @click="modalOpened = true">Click to open modal</VButton>
    <VButton @click="dialogOpened = true">Click to open dialog</VButton>
    <!-- <VModal v-model="modalOpened" header="Hey header" rounded="lg">
      This is modal content with a long text to test the marging applied between the close button
      <template #footer>
        This is the footer content
      </template>
    </VModal>
    <VDialog v-model="dialogOpened" title="Remove user" cancel="Annuler" submit="Valider" :on-submit="dialogSubmit">
      Are you sure ? You can't undo this action afterwards.
    </VDialog> -->
  </div>
</template>
  
<script setup>
const dialogOpened = ref(false)
const modalOpened = ref(false)
const test = ref(false)
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

const ouiok = { label: 'oui', value: 12 }
const nonok = { label: 'non', value: 14 }

const radio = ref('')

const checkbox = ref('')

const dialogSubmit = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
}
</script>