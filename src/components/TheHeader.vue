<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import AppWrapper from '@/components/utils/AppWrapper.vue'
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/router.js'

const userStore = useUserStore()

const logout = () => {
    userStore.user = {}
    userStore.isAuth = false
    localStorage.removeItem('token')
    window.location.reload()
}
</script>

<template>
    <header class="w-full bg-slate-100 py-3 md:py-6">
        <AppWrapper>
            <nav class="flex justify-between items-center gap-x-5">
                <div class="flex flex-col">
                    <div
                        class="flex gap-x-1 leading-5 flex-wrap text-sm sm:text-base"
                        v-if="userStore.user.user_role_id !== 1"
                    >
                        <span>{{ userStore.user.second_name }}</span>
                        <span>{{ userStore.user.first_name }}</span>
                        <span v-if="userStore.user.third_name">{{
                            userStore.user.third_name
                        }}</span>
                    </div>
                    <span class="text-xs">{{ userStore.getUserRole }}</span>
                </div>
                <ul
                    class="flex gap-2 text-sm sm:text-base sm:gap-5 font-medium"
                >
                    <li>
                        <router-link
                            :to="{ name: 'main' }"
                            class="text-sky-600 hover:text-sky-700 transition duration-300 cursor-pointer"
                            >Главная</router-link
                        >
                    </li>
                    <li>
                        <a
                            class="text-sky-600 hover:text-sky-700 transition duration-300 cursor-pointer"
                            >Профиль</a
                        >
                    </li>
                    <li>
                        <a
                            @click="logout"
                            class="text-sky-600 hover:text-sky-700 transition duration-300 cursor-pointer"
                            >Выйти</a
                        >
                    </li>
                </ul>
            </nav>
        </AppWrapper>
    </header>
</template>

<style scoped></style>
