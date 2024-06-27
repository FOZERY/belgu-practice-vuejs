<script setup>
import LoginLayout from '@/layouts/LoginLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { ref } from 'vue'

const password = ref('')
const email = ref('')
</script>

<template>
    <LoginLayout>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
                class="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900"
            >
                Вход в систему
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent>
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Email</label
                    >
                    <div class="mt-2">
                        <AppInput
                            v-model="email"
                            :type="'email'"
                            :name="'email'"
                            class="w-full"
                        />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label
                            for="password"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Пароль</label
                        >
                    </div>
                    <div class="mt-2">
                        <AppInput
                            v-model="password"
                            :type="'password'"
                            :name="'password'"
                            class="w-full"
                        />
                    </div>
                </div>

                <div>
                    <AppButton
                        class="w-full bg-blue-700 text-white font-medium py-1.5 hover:bg-blue-600"
                        @click.prevent=""
                        >Войти</AppButton
                    >
                </div>
            </form>
        </div>
    </LoginLayout>
</template>

<style scoped></style>
