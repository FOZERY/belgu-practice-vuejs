import { defineStore } from 'pinia'
import { $authhost } from '@/http/index.js'

export const useCoursesStore = defineStore('coursesStore', {
    state: () => ({
        courses: [],
        course: {},
    }),

    getters: {},

    actions: {
        async getCoursesByStudentId(id) {
            const { data } = await $authhost.get(`/api/student/${id}/courses`)
            return data
        },

        async getCoursesByTeacherId(id) {
            const { data } = await $authhost.get(`/api/teacher/${id}/courses`)
            return data
        },

        async getCourseFullInfo(id) {
            const { data } = await $authhost.get(`/api/course/${id}`)
            return data
        },

        async getCourseGroupLessonsWithGrades(
            course_id,
            group_id,
            page,
            limit
        ) {
            const { data } = await $authhost.get(
                `/api/course/${course_id}/group/${group_id}/lessons?page=${page}&limit=${limit}`
            )
            return data
        },
    },
})
