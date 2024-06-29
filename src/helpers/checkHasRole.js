import { useUserStore } from '@/stores/userStore.js'
import authRoleTypes from '@/helpers/authRoleTypes.js'

export default function (roles) {
    const userStore = useUserStore()
    if (!userStore.user.user_role_id) return false
    return roles.some(
        (role) => role === authRoleTypes[userStore.user.user_role_id]
    )
}
