import { useUserStore } from '@/stores/userStore.js'
import AccessError from '@/router/errors/AccessError.js'

export default async function () {
    try {
        const userStore = useUserStore()
        await userStore.check()
    } catch (e) {
        return
    }
}
