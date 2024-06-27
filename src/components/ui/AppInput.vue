<script setup>
defineProps({
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    name: { type: String, default: '' },
})

const model = defineModel()
</script>

<template>
    <input
        v-model="model"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :type="type"
        class="block rounded-md py-1 shadow-sm border-1 border-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition duration-300 disabled:bg-gray-100"
    />
</template>

<style scoped></style>
