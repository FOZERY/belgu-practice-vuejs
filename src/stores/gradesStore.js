import { defineStore } from 'pinia'
import { $authhost } from '@/http/index.js'

export const useGradesStore = defineStore('gradesStore', {
    state: () => ({
        grades: [],
    }),

    actions: {
        async getGradesByCourseAndGroup(course_id, group_id, offset) {
            const { data } = await $authhost.get(
                `/api/course/${course_id}/group/${group_id}/grades?offset=${offset}`
            )
            return data
        },
    },
})
