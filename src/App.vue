<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/router.js'
import { onBeforeRouteUpdate } from 'vue-router'
import AppLoader from '@/components/ui/AppLoader.vue'

const userStore = useUserStore()

const isLoading = ref(true)

onMounted(() => {
    userStore
        .check()
        .then(async (data) => {
            userStore.user = data
            userStore.isAuth = true
        })
        .finally(() => {
            isLoading.value = false
        })
})
</script>

<template>
    <div
        v-if="isLoading"
        class="w-full h-full flex justify-center items-center pb-32"
    >
        <AppLoader v-if="!isLoading" />
    </div>
    <router-view v-else></router-view>
</template>

<style scoped></style>
