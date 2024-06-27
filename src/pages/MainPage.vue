<script setup>
import AppInput from '@/components/ui/AppInput.vue'
import { ref } from 'vue'

const msg = ref('')
</script>

<template>
    <h1>{{ msg }}</h1>
    <AppInput v-model="msg" />
</template>

<style scoped></style>
