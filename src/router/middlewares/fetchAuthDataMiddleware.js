import { useUserStore } from '@/stores/userStore.js'

export default async function () {
    try {
        const userStore = useUserStore()
        await userStore.check()
    } catch (e) {
        return
    }
}
