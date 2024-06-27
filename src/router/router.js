import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/pages/MainPage.vue'),
        name: 'main',
    },
    {
        path: '/login',
        component: () => import('@/pages/LoginPage.vue'),
        name: 'login',
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
})

export default router
