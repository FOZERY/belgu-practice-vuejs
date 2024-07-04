<script setup>
import { useUserStore } from '@/stores/userStore.js'
import PageHeading from '@/components/PageHeading.vue'
import MainPageNavigation from '@/pages/MainPageNavigation.vue'
import MainPageNavigationItem from '@/pages/MainPageNavigationItem.vue'

const userStore = useUserStore()
</script>

<template>
    <div class="flex flex-col items-center">
        <PageHeading class="mb-3">Навигация</PageHeading>
        <MainPageNavigation>
            <MainPageNavigationItem :to="{ name: 'schedule' }"
                >Расписание
            </MainPageNavigationItem>
            <MainPageNavigationItem :to="{ name: 'courses' }"
                >Курсы</MainPageNavigationItem
            >
        </MainPageNavigation>
    </div>
</template>

<style scoped></style>
