import { defineStore } from 'pinia'
import { $authhost } from '@/http/index.js'

export const useGradesStore = defineStore('gradesStore', {
    state: () => ({
        grades: [],
    }),

    actions: {
        async getGradesByCourseAndGroup(course_id, group_id, page, limit) {
            const { data } = await $authhost.get(
                `/api/course/${course_id}/group/${group_id}/grades?page=${page}&limit=${limit}`
            )
            return data
        },
    },
})
