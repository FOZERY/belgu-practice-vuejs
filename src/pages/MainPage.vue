<script setup>
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/router.js'
import MainLayout from '@/layouts/MainLayout.vue'

import { computed, defineAsyncComponent, onMounted } from 'vue'

const componentToRender = computed(() => {
    if (userStore.user.role_id === 1) {
        return defineAsyncComponent(() => import('@/pages/MainPageAdmin.vue'))
    } else if (userStore.user.role_id === 2) {
        return defineAsyncComponent(() => import('@/pages/MainPageTeacher.vue'))
    } else if (userStore.user.role_id === 3) {
        return defineAsyncComponent(() => import('@/pages/MainPageStudent.vue'))
    }
})

const userStore = useUserStore()
</script>

<template>
    <MainLayout>
        <component :is="componentToRender" />
    </MainLayout>
</template>

<style scoped></style>
