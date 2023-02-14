<template>
  <div>
    <VButton>Test it</VButton>
    <VInputText v-model="name" placeholder="Icon input placeholder" name="icon" leading="heroicons-solid:search"
      :rules="rules" />
    <VIcon name="test" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const rules = (value: any) => !!value
</script>
