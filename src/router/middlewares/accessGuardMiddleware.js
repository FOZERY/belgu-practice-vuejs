import checkHasRole from '@/helpers/checkHasRole.js'

export default function (to) {
    const { roles } = to.meta
    if (!roles) return

    if (checkHasRole(roles)) return

    return { name: 'accessError' }
}
