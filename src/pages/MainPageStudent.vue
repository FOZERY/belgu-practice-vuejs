<script setup>
import AppNavigation from '@/components/AppNavigation.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
    <div class="flex flex-col items-center">
        <AppHeader class="mb-3">Навигация</AppHeader>
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
