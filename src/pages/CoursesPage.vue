<script setup>
import PageHeading from '@/components/PageHeading.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import { useCoursesStore } from '@/stores/coursesStore.js'
import AppLoader from '@/components/ui/AppLoader.vue'

const userStore = useUserStore()
const coursesStore = useCoursesStore()

const isLoading = ref(true)
const courses = ref([])

onMounted(async () => {
    try {
        if (userStore.user.user_role_id === 2) {
            courses.value = await coursesStore.getCoursesByTeacherId(
                userStore.user.teacher_id
            )
        } else if (userStore.user.user_role_id === 3) {
            courses.value = await coursesStore.getCoursesByStudentId(
                userStore.user.student_id
            )
        }
    } catch (e) {
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="flex flex-col items-center">
        <PageHeading class="mb-3">Курсы</PageHeading>
        <div class="w-full px-5">
            <AppLoader class="mx-auto" v-if="isLoading" />
            <ul v-else class="flex flex-col gap-3">
                <li v-for="course in courses" :key="course.id">
                    <router-link
                        :to="{
                            name: 'oneCourse',
                            params: { id: course.id },
                        }"
                        href="#"
                        class="flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div
                            class="flex flex-col justify-between p-4 leading-normal"
                        >
                            <h5
                                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                            >
                                {{ course.course_name }}
                            </h5>
                            <p
                                class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                            >
                                {{ course.course_description }}
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>
