<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudentsStore } from '@/stores/studentsStore.js'
import AppButton from '@/components/ui/AppButton.vue'
import { useCoursesStore } from '@/stores/coursesStore'
import checkHasRole from '@/helpers/checkHasRole'
import AppLoader from '@/components/ui/AppLoader.vue'

const router = useRouter()
const route = useRoute()

const coursesStore = useCoursesStore()
const studentsStore = useStudentsStore()
const students = ref([])
const lessons = ref([])

const isLoading = ref(true)

const getStudentGrade = (lesson, student_id) => {
    const student = lesson.lessonStudents?.find(
        (s) => s.student_id === student_id
    )
    return 5
}

const setStudentGrade = (lesson, student_id, value) => {
    console.log(lesson.lesson_id, student_id, value)
}

const currentPage = ref(1)
const limit = ref(8)
const total = ref(null)

const totalPages = computed(() => {
    return Math.ceil(total.value / limit.value)
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

watch(currentPage, async () => {
    isLoading.value = true
    const response = await coursesStore.getCourseGroupLessonsWithGrades(
        route.params.id,
        route.params.groupId,
        currentPage.value,
        limit.value
    )
    lessons.value = response.lessons
    isLoading.value = false
})

onMounted(async () => {
    isLoading.value = true
    const response = await coursesStore.getCourseGroupLessonsWithGrades(
        route.params.id,
        route.params.groupId,
        currentPage.value,
        limit.value
    )
    lessons.value = response.lessons
    total.value = response.total
    students.value = await studentsStore.getStudentsByGroupId(
        route.params.groupId
    )
    isLoading.value = false
})
</script>

<template>
    <div class="block w-full">
        <AppLoader v-if="isLoading" />
        <div v-else class="flex flex-col">
            <div class="sm:-mx-6 lg:-mx-8 overflow-x-auto">
                <div class="inline-block py-2 sm:px-6 lg:px-8">
                    <div class="overflow-x-auto">
                        <table
                            class="min-w-full text-start text-sm font-light text-surface dark:text-white overflow-x-auto"
                        >
                            <thead
                                class="border-b border-neutral-200 font-medium dark:border-white/10"
                            >
                                <tr>
                                    <th scope="col" class="px-5 py-4">
                                        Студенты
                                    </th>
                                    <th
                                        v-for="lesson in lessons"
                                        :key="lesson.lesson_id"
                                        scope="col"
                                        class="px-4 py-4"
                                    >
                                        {{
                                            new Date(
                                                lesson.lesson_date
                                            ).toLocaleDateString()
                                        }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="student in students"
                                    :key="student.id"
                                    class="border-b border-neutral-200 dark:border-white/10"
                                >
                                    <td
                                        class="whitespace-nowrap px-6 py-4 font-medium"
                                    >
                                        {{
                                            `${student.second_name} ${student.first_name} ${student.third_name}`
                                        }}
                                    </td>
                                    <td
                                        v-for="lesson in lessons"
                                        :key="lesson.lessin_id"
                                        class="whitespace-nowrap text-center py-0"
                                    >
                                        <span
                                            v-if="checkHasRole(['STUDENT'])"
                                            >{{
                                                getStudentGrade(
                                                    lesson,
                                                    student.id
                                                )
                                            }}</span
                                        >
                                        <select
                                            v-else
                                            class="border-none cursor-pointer h-14 text-center focus:bg-black/5 hover:bg-black/5"
                                            :value="
                                                getStudentGrade(
                                                    lesson,
                                                    student.id
                                                )
                                            "
                                            @change="
                                                (event) =>
                                                    setStudentGrade(
                                                        lesson,
                                                        student.id,
                                                        event.target.value
                                                    )
                                            "
                                        >
                                            <option value="" selected>-</option>
                                            <option
                                                v-for="n in 5"
                                                :key="n"
                                                :value="n"
                                            >
                                                {{ n }}
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-5">
                <div class="flex justify-between w-2/12">
                    <AppButton
                        v-if="currentPage !== 1"
                        @click="prevPage"
                        class="bg-sky-400 text-white"
                        >Назад</AppButton
                    >
                    <AppButton
                        @click="nextPage"
                        v-if="currentPage !== totalPages"
                        class="bg-sky-400 text-white ml-auto"
                        >Вперед</AppButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
