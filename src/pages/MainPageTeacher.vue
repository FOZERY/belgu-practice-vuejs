<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import PageHeading from '@/components/PageHeading.vue'
</script>

<template>
    <div class="">
        <div class="flex flex-col items-center">
            <PageHeading>Навигация</PageHeading>
            <div class="flex flex-col mt-3">
                <nav>
                    <ul class="flex flex-col items-center gap-3">
                        <li>
                            <AppButton
                                class="bg-white border text-lg rounded-2xl hover:scale-105"
                                >Расписание</AppButton
                            >
                        </li>
                        <li>
                            <router-link :to="{ name: 'courses' }"
                                ><AppButton
                                    class="bg-white border text-lg rounded-2xl hover:scale-105"
                                    >Курсы</AppButton
                                ></router-link
                            >
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
