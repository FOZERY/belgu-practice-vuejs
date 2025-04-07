import { defineStore } from 'pinia'
import { $authhost } from '@/http/index.js'

export const useGradesStore = defineStore('gradesStore', {
    state: () => ({
        grades: [],
    }),

    actions: {
        async addGrade(lesson_id, student_id, grade_type_id) {
            const response = await $authhost.post('/api/grade', {
                lesson_id,
                student_id,
                grade_type_id,
            })
            console.log(response)
        },
    },
})
