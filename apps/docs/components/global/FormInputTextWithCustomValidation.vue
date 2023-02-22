<template>
  <InputWithVmodel v-bind="$attrs" component="VInputText">
    <template #validation="{ validation }">
      <div class="text-orange-500">
        {{ validation?.field.errorMessage.value }} 🔫
      </div>
    </template>
  </InputWithVmodel>
</template>
  
<script lang="ts">
export default defineComponent({
  inheritAttrs: false
})
</script>