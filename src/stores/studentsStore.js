import { defineStore } from 'pinia'
import { $authhost } from '@/http/index.js'

export const useStudentsStore = defineStore('studentsStore', {
    state: () => ({
        grades: [],
    }),

    actions: {
        async getStudentsByGroupId(id) {
            const { data } = await $authhost.get(`/api/group/${id}/students`)
            return data
        },
    },
})
