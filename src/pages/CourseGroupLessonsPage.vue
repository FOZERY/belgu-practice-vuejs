<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudentsStore } from '@/stores/studentsStore.js'
import { useCoursesStore } from '@/stores/coursesStore'
import checkHasRole from '@/helpers/checkHasRole'
import AppButton from '@/components/ui/AppButton.vue'
import { useGradesStore } from '@/stores/gradesStore.js'
import AppLoader from '@/components/ui/AppLoader.vue'
import { useUserStore } from '@/stores/userStore.js'

const router = useRouter()
const route = useRoute()

const gradeMap = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: 'Н',
    7: '-',
}

const coursesStore = useCoursesStore()
const studentsStore = useStudentsStore()
const gradesStore = useGradesStore()
const userStore = useUserStore()

const students = ref([])
const lessons = ref([])

const isLoading = ref(true)

const getStudentGradeId = (lesson, student_id) => {
    const student = lesson.students?.find((s) => s.student_id === student_id)
    return student?.grade_type_id
}

const setStudentGrade = async (lesson, student_id, grade_type_id) => {
    try {
        const student = lesson.students?.find(
            (s) => s.student_id === student_id
        )
        student.grade_type_id = grade_type_id
        student.grade = gradeMap[grade_type_id]
        isLoading.value = true
        await gradesStore.addGrade(lesson.lesson_id, student_id, grade_type_id)
    } catch (e) {
        console.log(e)
    } finally {
        isLoading.value = false
    }
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

const fetchLessons = async () => {
    const response = await coursesStore.getCourseGroupLessonsWithGrades(
        route.params.id,
        route.params.groupId,
        currentPage.value,
        limit.value
    )
    lessons.value = response.lessons
    total.value = response.total
}

watch(currentPage, async () => {
    isLoading.value = true
    await fetchLessons()
    isLoading.value = false
})

onMounted(async () => {
    isLoading.value = true
    await fetchLessons()
    students.value = await studentsStore.getStudentsByGroupId(
        route.params.groupId
    )
    isLoading.value = false
})
</script>

<template>
    <AppLoader v-if="isLoading"></AppLoader>
    <div v-else class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table
                        class="min-w-full text-left text-sm font-light text-surface dark:text-white"
                    >
                        <thead
                            class="border-b border-neutral-200 font-medium dark:border-white/10"
                        >
                            <tr>
                                <th scope="col" class="px-3 py-2 max-w-32">
                                    Студенты
                                </th>
                                <th
                                    v-for="lesson in lessons"
                                    :key="lesson.lesson_id"
                                    scope="col"
                                    class="px-3 py-2"
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
                                    class="whitespace-nowrap px-3 py-2 font-medium"
                                >
                                    {{
                                        `${student.second_name} ${student.first_name} ${student.third_name}`
                                    }}
                                </td>
                                <td
                                    v-for="lesson in lessons"
                                    :key="lesson.lesson_id"
                                    class="whitespace-nowrap px-3 py-2 font-medium"
                                >
                                    <span v-if="checkHasRole(['STUDENT'])">{{
                                        gradeMap[
                                            getStudentGradeId(
                                                lesson,
                                                student.id
                                            )
                                        ]
                                    }}</span>
                                    <select
                                        v-else
                                        class="border-none cursor-pointer h-14 text-center focus:bg-black/5 hover:bg-black/5"
                                        :value="
                                            getStudentGradeId(
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
                                        <option
                                            v-for="(
                                                grade, grade_type_id
                                            ) in gradeMap"
                                            :key="grade_type_id"
                                            :value="grade_type_id"
                                        >
                                            {{ grade }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-if="lessons.length > 0" class="flex justify-between mt-5">
            <AppButton
                v-if="currentPage !== 1"
                @click="prevPage"
                class="bg-sky-400 text-white"
                >Назад
            </AppButton>
            <AppButton
                @click="nextPage"
                v-if="currentPage !== totalPages"
                class="bg-sky-400 text-white ml-auto"
                >Вперед
            </AppButton>
        </div>
    </div>
</template>

<style scoped></style>
