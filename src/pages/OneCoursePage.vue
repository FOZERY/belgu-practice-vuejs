<script setup>
import router from '@/router/router.js'
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { useCoursesStore } from '@/stores/coursesStore.js'
import PageHeading from '@/components/PageHeading.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const route = useRoute()

const coursesStore = useCoursesStore()

const course = reactive({})

onMounted(async () => {
    const courseData = await coursesStore.getCourseFullInfo(route.params.id)
    Object.assign(course, courseData)
})
</script>

<template>
    <MainLayout>
        {{ course }}
        <div class="flex flex-col items-center">
            <PageHeading>{{ coursesStore.course.course_name }}</PageHeading>
            <div class="w-full">
                <h3 class="font-medium">Учителя</h3>
                <ul>
                    <li v-for="teachers in coursesStore.course.teachers">
                        {{ teachers.second_name }}
                        {{ teachers.first_name }}
                        {{ teachers.third_name }}
                    </li>
                </ul>
                <h3 class="font-medium">Группы</h3>
                <ul>
                    <li v-for="groups in coursesStore.course.groups">
                        {{ groups.group_number }}
                    </li>
                </ul>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped></style>
