import { defineStore } from 'pinia'
import { $authhost } from '@/http/index.js'

export const useScheduleStore = defineStore('scheduleStore', {
    state: () => ({
        lessons: [],
    }),

    actions: {
        async getLessonsByGroupId(group_id, from, to) {
            const { data } = await $authhost.get(
                `/api/lesson/g/${group_id}?from=${from}&to=${to}`
            )

            return data
        },
    },
})
