import { useUserStore } from '@/stores/userStore.js'

export default function (to) {
    const userStore = useUserStore()
    if (to.meta.auth && !userStore.isAuth) {
        return { name: 'login' }
    } else if (to.name === 'login' && userStore.isAuth) {
        return { name: 'main' }
    } else {
        return true
    }
}
