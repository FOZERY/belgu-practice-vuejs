import { defineStore } from 'pinia'
import { $authhost } from '@/http/index.js'

export const useGroupStore = defineStore('groupStore', {
    state: () => ({
        groups: [],
    }),

    actions: {
        async getGroups(group_number) {
            const { data } = await $authhost.get(`/api/group`, {
                params: { group_number },
            })

            return data
        },
    },
})
