<script setup>
defineProps({
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'button' },
})

defineEmits(['click'])
</script>

<template>
    <button
        @click="$emit('click')"
        :disabled="disabled"
        :type="type"
        class="rounded-xl border-gray-300 shadow-md px-3 py-1 transition duration-200 disabled:cursor-default select-none"
    >
        <slot></slot>
    </button>
</template>

<style scoped></style>
