import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'

const routes = [
    {
        path: '/',
        component: () => import('@/pages/MainPage.vue'),
        name: 'main',
        meta: { auth: true },
    },
    {
        path: '/login',
        component: () => import('@/pages/LoginPage.vue'),
        name: 'login',
        meta: { auth: false },
    },
    {
        path: '/courses',
        component: () => import('@/pages/CoursesPage.vue'),
        name: 'courses',
        meta: { auth: true },
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeResolve(async (to, from, next) => {
    const userStore = useUserStore()
    if (to.meta.auth && !userStore.isAuth) {
        next({ name: 'login' })
    } else if (to.name === 'login' && userStore.isAuth) {
        next({ name: 'main' })
    } else {
        next()
    }
})

router.afterEach((to, from, next) => {
    const userStore = useUserStore()
    if (to.name === 'main') {
        document.title = `Кабинет ${userStore.getUserRole}а`
    }
})

export default router
