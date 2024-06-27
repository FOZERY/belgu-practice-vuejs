<script setup>
defineProps({
    disabled: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<template>
    <button
        @click="$emit('click')"
        class="rounded-3xl shadow-md px-3 py-1 transition duration-300"
    >
        <slot></slot>
    </button>
</template>

<style scoped></style>
