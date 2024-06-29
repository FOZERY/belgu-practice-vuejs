<script setup>
import TheHeader from '@/components/TheHeader.vue'
import AppWrapper from '@/components/utils/AppWrapper.vue'
</script>

<template>
    <TheHeader />
    <main class="py-5">
        <AppWrapper>
            <slot />
        </AppWrapper>
    </main>
</template>

<style scoped></style>
