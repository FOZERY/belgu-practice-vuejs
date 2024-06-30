<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGradesStore } from '@/stores/gradesStore.js'
import { useStudentsStore } from '@/stores/studentsStore.js'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const route = useRoute()

const gradeStore = useGradesStore()
const studentsStore = useStudentsStore()
const students = ref([])
const grades = ref([])

const getGrade = (students, studentId) => {
    const student = students.find((s) => s.student_id === studentId)
    return student ? student.grade : ' '
}

const offset = ref(0)

const incrementOffset = () => {
    offset.value++
}

const decrementOffset = () => {
    offset.value--
}

watch(offset, async () => {
    grades.value = await gradeStore.getGradesByCourseAndGroup(
        route.params.id,
        route.params.groupId,
        offset.value
    )
})

onMounted(async () => {
    grades.value = await gradeStore.getGradesByCourseAndGroup(
        route.params.id,
        route.params.groupId,
        offset.value
    )
    students.value = await studentsStore.getStudentsByGroupId(
        route.params.groupId
    )
})
</script>

<template>
    <div class="block w-full overflow-x-auto py-5">
        <table class="items-center bg-transparent w-full border-collapse">
            <thead>
                <tr>
                    <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                        Студенты
                    </th>
                    <th
                        v-for="grade in grades"
                        :key="grade.lesson_id"
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                        {{ new Date(grade.lesson_date).toLocaleDateString() }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="student in students" :key="student.id">
                    <th
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700"
                    >
                        {{
                            `${student.second_name} ${student.first_name} ${student.third_name}`
                        }}
                    </th>
                    <td
                        v-for="grade in grades"
                        :key="grade.lesson_id"
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                        {{ getGrade(grade.students, student.id) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="flex justify-between mt-5">
            <AppButton
                @click="decrementOffset"
                v-if="offset !== 0"
                class="bg-sky-400 text-white"
                >Назад</AppButton
            ><AppButton
                @click="incrementOffset"
                class="bg-sky-400 text-white ml-auto"
                >Вперед</AppButton
            >
        </div>
    </div>
</template>

<style scoped></style>
