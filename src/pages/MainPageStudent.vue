<script setup>
import AppNavigation from '@/components/AppNavigation.vue'
import AppButton from '@/components/ui/AppButton.vue'
import PageHeading from '@/components/PageHeading.vue'
</script>

<template>
    <div class="flex flex-col items-center">
        <PageHeading class="mb-3">Навигация</PageHeading>
        <AppNavigation class="w-1/6">
            <li>
                <AppButton
                    class="bg-white border text-xl rounded-2xl hover:scale-105 w-full"
                    >Расписание</AppButton
                >
            </li>
            <li class="mt-3">
                <router-link :to="{ name: 'courses' }"
                    ><AppButton
                        class="bg-white border text-xl rounded-2xl hover:scale-105 w-full"
                        >Курсы</AppButton
                    ></router-link
                >
            </li>
        </AppNavigation>
    </div>
</template>

<style scoped></style>
