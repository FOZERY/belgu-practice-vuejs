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
    },
})
