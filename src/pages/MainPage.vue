<script setup>
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/router.js'
import MainLayout from '@/layouts/AppLayoutDefault.vue'

import { computed, defineAsyncComponent, onMounted } from 'vue'
import PageHeading from '@/components/PageHeading.vue'
import MainPageNavigation from '@/pages/MainPageNavigation.vue'
import MainPageNavigationItem from '@/pages/MainPageNavigationItem.vue'

const userStore = useUserStore()

/*
const componentToRender = computed(() => {
    if (userStore.user.user_role_id === 1) {
        return defineAsyncComponent(() => import('@/pages/MainPageAdmin.vue'))
    } else if (userStore.user.user_role_id === 2) {
        return defineAsyncComponent(() => import('@/pages/MainPageTeacher.vue'))
    } else if (userStore.user.user_role_id === 3) {
        return defineAsyncComponent(() => import('@/pages/MainPageStudent.vue'))
    }
})

 */
</script>

<template>
    <div class="flex flex-col items-center">
        <PageHeading class="mb-3">Навигация</PageHeading>
        <MainPageNavigation>
            <MainPageNavigationItem>Расписание</MainPageNavigationItem>
            <MainPageNavigationItem :to="{ name: 'courses' }"
                >Курсы</MainPageNavigationItem
            >
        </MainPageNavigation>
    </div>
</template>

<style scoped></style>
