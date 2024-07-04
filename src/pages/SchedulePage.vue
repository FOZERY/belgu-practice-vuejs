<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useScheduleStore } from '@/stores/scheduleStore.js'
import { useUserStore } from '@/stores/userStore.js'
import PageHeading from '@/components/PageHeading.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useGroupStore } from '@/stores/groupStore.js'

const scheduleStore = useScheduleStore()
const userStore = useUserStore()
const groupStore = useGroupStore()

const searchInput = ref('')
const groups = ref([])
const lessons = ref([])
const group_id = ref(null)

const isSearching = ref(false)
const searchGroups = async () => {
    try {
        if (!searchInput.value) groups.value = []

        groups.value = await groupStore.getGroups(searchInput.value)
    } catch (e) {
        console.log(e)
    }
}

const clickOnSearchedGroup = async (group_number, groupId) => {
    searchInput.value = group_number
    isSearching.value = false
    group_id.value = groupId
    await fetchLessons(groupId, mondayDate, sundayDate)
}

const daysOfWeek = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
]

const lessonsByDay = computed(() => {
    const groupedLessons = {
        Понедельник: [],
        Вторник: [],
        Среда: [],
        Четверг: [],
        Пятница: [],
        Суббота: [],
        Воскресенье: [],
    }
    lessons.value.forEach((lesson) => {
        const lessonDate = new Date(lesson.lesson_date)
        console.log(lessonDate.getUTCDay())
        const dayOfWeek = daysOfWeek[lessonDate.getUTCDay()]
        groupedLessons[dayOfWeek].push(lesson)
    })
    return daysOfWeek.map((day, index) => {
        const currentDate = new Date(mondayDate)
        currentDate.setDate(currentDate.getDate() + index)
        return {
            day,
            date: currentDate.toLocaleDateString().toLocaleString(),
            lessons: groupedLessons[day],
        }
    })
})

const fetchLessons = async (group_id, mondayDate, sundayDate) => {
    lessons.value = await scheduleStore.getLessonsByGroupId(
        group_id,
        dateToString(mondayDate),
        dateToString(sundayDate)
    )
}

const goNextWeek = async () => {
    mondayDate.setDate(mondayDate.getDate() + 7)
    sundayDate.setDate(sundayDate.getDate() + 7)

    await fetchLessons(group_id.value, mondayDate, sundayDate)
}
const goPrevWeek = async () => {
    mondayDate.setDate(mondayDate.getDate() - 7)
    sundayDate.setDate(sundayDate.getDate() - 7)

    await fetchLessons(group_id.value, mondayDate, sundayDate)
}

const mondayDate = reactive(new Date('2024-06-03'))
const sundayDate = reactive(new Date('2024-06-09'))

const dateToString = (date) => date.toISOString().slice(0, 10)

watch(searchInput, async () => {})

onMounted(async () => {
    try {
        searchInput.value = userStore.user.group_number
        group_id.value = userStore.user.group_id

        await fetchLessons(group_id.value, mondayDate, sundayDate)
    } catch (e) {
        console.log(e)
    }
})
</script>

<template>
    <div>
        <PageHeading class="mx-auto text-center">Расписание</PageHeading>
        <div class="mx-auto w-2/3 pb-10">
            <div class="py-3">
                <label>Поиск</label>
                <div class="flex flex-col min-w-32 max-w-64 relative">
                    <AppInput
                        @focus="isSearching = true"
                        @input="searchGroups"
                        v-model="searchInput"
                    />
                    <div
                        v-if="isSearching && groups.length > 0"
                        class="absolute w-full top-8 z-30 bg-white rounded-md border-2 py-1"
                    >
                        <ul class="flex flex-col gap">
                            <li
                                @click.prevent="
                                    clickOnSearchedGroup(
                                        group.group_number,
                                        group.id
                                    )
                                "
                                class="hover:bg-black/5 px-2 cursor-pointer"
                                v-for="group in groups"
                                :key="group.id"
                            >
                                {{ group.group_number }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="!group_id" class="flex flex-col gap-5 py-10">
                <div class="flex flex-col gap-3 items-center">
                    <h3 class="text-xl">Ничего не найдено!</h3>
                    <p class="">Воспользуйтесь строкой поиска.</p>
                </div>
            </div>
            <div v-else class="flex flex-col gap-5 py-3">
                <div v-for="{ day, date, lessons } in lessonsByDay" :key="day">
                    <div class="flex gap-3">
                        <p class="font-medium text-xl mb-3">{{ day }}</p>
                        <p class="font-medium text-xl mb-3">
                            {{ date }}
                        </p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div
                            v-if="lessons.length === 0"
                            class="flex bg-white border border-gray-200 p-4 gap-5 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div
                                class="flex flex-col justify-between leading-normal"
                            >
                                <p
                                    class="text-lg tracking-tight text-stone-600"
                                >
                                    Пар нет.
                                </p>
                            </div>
                        </div>
                        <div
                            v-else
                            v-for="lesson in lessons"
                            :key="lesson.lesson_id"
                            class="flex bg-white border border-gray-200 p-4 gap-5 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div
                                class="flex flex-col justify-center gap-3 items-center"
                            >
                                <span>{{
                                    lesson.lesson_start_time.slice(0, -3)
                                }}</span>
                                -
                                <span>{{
                                    lesson.lesson_end_time.slice(0, -3)
                                }}</span>
                            </div>
                            <div class="border-l"></div>
                            <div
                                class="flex flex-col justify-between leading-normal"
                            >
                                <div class="text-sky-500 font-medium">
                                    {{ lesson.lesson_type }}
                                </div>
                                <h5
                                    class="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                                >
                                    {{ lesson.course_name }}
                                </h5>
                                <div class="flex gap-2 items-center">
                                    <p
                                        class="font-normal text-sm text-gray-700 dark:text-gray-400"
                                    >
                                        Преподаватель:
                                    </p>
                                    <div class="">
                                        <span>
                                            {{
                                                `${lesson.teacher_second_name} ${lesson.teacher_first_name} ${lesson.teacher_third_name}`
                                            }}
                                        </span>
                                        <span class="text-sm">
                                            ({{ lesson.teacher_position }})
                                        </span>
                                    </div>
                                </div>

                                <div class="flex gap-3 items-center">
                                    <p
                                        class="font-normal text-sm text-gray-700 dark:text-gray-400"
                                    >
                                        Группы:
                                    </p>
                                    <div
                                        v-for="group in lesson.groups"
                                        :key="group.id"
                                    >
                                        <div
                                            class="border text-sm rounded-3xl p-0.5 px-2 text-white bg-sky-500"
                                        >
                                            {{ group.group_number }}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-3 items-center">
                                    <p
                                        class="font-normal text-sm text-gray-700 dark:text-gray-400"
                                    >
                                        Корпус: {{ lesson.classroom_building }}
                                    </p>
                                </div>
                                <div class="flex mb-3 gap-3 items-center">
                                    <p
                                        class="font-normal text-sm text-gray-700 dark:text-gray-400"
                                    >
                                        Аудитория: {{ lesson.classroom_number }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between mt-5">
                    <AppButton @click="goPrevWeek" class="bg-sky-500 text-white"
                        >Предыдущая неделя</AppButton
                    >
                    <AppButton @click="goNextWeek" class="bg-sky-500 text-white"
                        >Следующая неделя</AppButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
