<template>
    <component :is="component">
        <ContentSlot :use="$slots.default" unwrap="p" />
    </component>
</template>

<script setup>
defineProps({
    component: {
        type: String,
        required: true
    }
})
</script>