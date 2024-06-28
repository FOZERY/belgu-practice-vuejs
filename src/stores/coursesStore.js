import { defineStore } from 'pinia'
import { $host, $authhost } from '@/http/index.js'
import { jwtDecode } from 'jwt-decode'

export const useCoursesStore = defineStore('coursesStore', {
    state: () => ({
        courses: [],
        course: {},
    }),

    getters: {},

    actions: {
        async getCoursesByStudentId(id) {
            const { data } = await $authhost.get(`/api/student/${id}/courses`)
            this.courses = data
        },

        async getCoursesByTeacherId(id) {
            const { data } = await $authhost.get(`/api/teacher/${id}/courses`)
            this.courses = data
        },

        async getCourseFullInfo(id) {
            const { data } = await $authhost.get(`/api/course/${id}`)
            this.course = data
            return data
        },
    },
})
