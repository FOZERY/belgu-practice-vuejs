<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/router.js'
import { onBeforeRouteUpdate } from 'vue-router'

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
    <router-view v-if="!isLoading"></router-view>
</template>

<style scoped></style>
