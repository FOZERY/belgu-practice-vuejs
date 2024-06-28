import { defineStore } from 'pinia'
import { $host, $authhost } from '@/http/index.js'
import { jwtDecode } from 'jwt-decode'

export const useCoursesStore = defineStore('coursesStore', {
    state: () => ({
        courses: [],
    }),

    getters: {},

    actions: {
        async getCoursesByStudentId(id) {
            const { data } = await $authhost.get(`/api/student/${id}/courses`)
            this.courses = data
        },
    },
})
