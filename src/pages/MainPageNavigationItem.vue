<script setup>
import AppButton from '@/components/ui/AppButton.vue'

defineProps({
    to: { type: [String, Object], default: '' },
})
</script>

<template>
    <li>
        <router-link :to="to">
            <AppButton
                class="bg-white border text-black text-lg rounded-2xl hover:scale-105 text-center w-full"
                ><slot></slot></AppButton
        ></router-link>
    </li>
</template>

<style scoped></style>
