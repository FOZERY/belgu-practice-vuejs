<script setup>
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { useCoursesStore } from '@/stores/coursesStore.js'
import PageHeading from '@/components/PageHeading.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useUserStore } from '@/stores/userStore.js'
import checkHasRole from '@/helpers/checkHasRole.js'

const route = useRoute()

const coursesStore = useCoursesStore()

const isLoading = ref(true)
const course = reactive({})

const userStore = useUserStore()

onMounted(async () => {
    try {
        isLoading.value = true
        const courseData = await coursesStore.getCourseFullInfo(route.params.id)
        Object.assign(course, courseData)
    } catch (e) {
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div
        class="flex flex-col gap-5 items-center w-full sm:w-5/6 md:w-3/4 mt-5 mx-auto"
    >
        <div class="flex items-center justify-between w-full">
            <div class="flex-grow text-center">
                <PageHeading>{{ course.course_name }}</PageHeading>
                <router-link
                    v-if="checkHasRole(['STUDENT'])"
                    :to="{
                        name: 'courseGroupAttendance',
                        params: {
                            id: course.course_id,
                            groupId: userStore.user.group_id,
                        },
                    }"
                >
                    <AppButton class="bg-sky-500 text-white py-1 ml-2"
                        >В журнал</AppButton
                    >
                </router-link>
            </div>
        </div>

        <AppLoader class="mx-auto" v-if="isLoading" />
        <div v-else class="w-full px-12">
            <div class="rounded-2xl border p-5 shadow-md mb-5">
                <h3 class="text-xl font-medium mb-3">Описание курса</h3>
                <p>
                    {{ course.course_description }}
                </p>
            </div>
            <div class="rounded-2xl border p-5 shadow-md mb-5">
                <h3 class="text-xl font-medium mb-3">Преподаватели</h3>
                <ul>
                    <li v-for="teachers in course.teachers">
                        <router-link
                            to=""
                            class="hover:text-sky-700 transition duration-300"
                        >
                            {{
                                `${teachers.second_name} ${teachers.first_name} ${teachers.third_name ?? ''}`
                            }}
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="rounded-2xl border p-5 shadow-md mb-5">
                <h3 class="text-xl font-medium mb-3">Группы</h3>
                <ul class="flex flex-col gap-3">
                    <li
                        class="flex items-center gap-3"
                        v-for="group in course.groups"
                    >
                        <router-link
                            to=""
                            class="hover:text-sky-700 transition duration-300"
                        >
                            {{ group.group_number }}
                        </router-link>
                        <router-link
                            v-if="checkHasRole(['ADMIN', 'TEACHER'])"
                            :to="{
                                name: 'courseGroupAttendance',
                                params: {
                                    id: course.course_id,
                                    groupId: group.group_id,
                                },
                            }"
                        >
                            <AppButton class="bg-sky-500 text-white"
                                >В журнал</AppButton
                            ></router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
