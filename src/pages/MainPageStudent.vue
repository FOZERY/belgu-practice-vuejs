<script setup>
import PageHeading from '@/components/PageHeading.vue'
import MainPageNavigation from '@/pages/MainPageNavigation.vue'
import MainPageNavigationItem from '@/pages/MainPageNavigationItem.vue'
</script>

<template>
    <div class="flex flex-col items-center">
        <PageHeading class="mb-3">Навигация</PageHeading>
        <MainPageNavigation>
            <MainPageNavigationItem :to="{ name: 'courses' }"
                >x</MainPageNavigationItem
            >
            <MainPageNavigationItem>y</MainPageNavigationItem>
        </MainPageNavigation>
    </div>
</template>

<style scoped></style>
