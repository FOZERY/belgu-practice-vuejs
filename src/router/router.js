import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import fetchAuthDataMiddleware from '@/router/middlewares/fetchAuthDataMiddleware.js'

import routeGuardMiddleware from '@/router/middlewares/routeGuardMiddleware.js'
import accessGuardMiddleware from '@/router/middlewares/accessGuardMiddleware.js'
import { loadLayoutMiddleware } from '@/router/middlewares/loadLayoutMiddleware.js'
import { AppLayoutNames } from '@/layouts/layoutsNames.js'

const routes = [
    {
        path: '/',
        component: () => import('@/pages/MainPage.vue'),
        name: 'main',
        meta: { auth: true, roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
    },
    {
        path: '/login',
        component: () => import('@/pages/LoginPage.vue'),
        name: 'login',
        meta: { auth: false, layout: AppLayoutNames.login },
    },
    {
        path: '/courses',
        component: () => import('@/pages/CoursesPage.vue'),
        name: 'courses',
        meta: { auth: true, roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
    },
    {
        path: '/courses/:id',
        component: () => import('@/pages/OneCoursePage.vue'),
        name: 'oneCourse',
        meta: { auth: true, roles: ['ADMIN', 'TEACHER', 'STUDENT'] },
    },
    {
        path: '/errors/forbidden',
        component: () => import('@/pages/AccessErrorPage.vue'),
        name: 'accessError',
        meta: { layout: AppLayoutNames.error },
    },
    {
        path: '/:pathName(.*)',
        redirect: '/',
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach(fetchAuthDataMiddleware)
router.beforeEach(routeGuardMiddleware)
router.beforeEach(accessGuardMiddleware)
router.beforeEach(loadLayoutMiddleware)

export default router
