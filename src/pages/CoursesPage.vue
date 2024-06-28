<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import PageHeading from '@/components/PageHeading.vue'
import AppNavigation from '@/components/AppNavigation.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import { useCoursesStore } from '@/stores/coursesStore.js'

const userStore = useUserStore()
const coursesStore = useCoursesStore()

onMounted(async () => {
    await coursesStore.getCoursesByStudentId(userStore.user.student_id)
})
</script>

<template>
    <MainLayout>
        <div class="flex flex-col items-center">
            <PageHeading class="mb-3">Курсы</PageHeading>
            <div class="w-full px-5">
                <ul class="flex flex-col gap-3">
                    <li v-for="course in coursesStore.courses" :key="course.id">
                        <router-link
                            :to="{ name: 'main' }"
                            href="#"
                            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
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
    </MainLayout>
</template>

<style scoped></style>
