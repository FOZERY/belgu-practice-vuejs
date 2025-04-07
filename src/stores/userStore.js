import { defineStore } from 'pinia'
import { $authhost, $host } from '@/http/index.js'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        isAuth: false,
        user: {},
    }),

    getters: {
        getUserRole() {
            const role_id = this.user.user_role_id
            if (role_id === 3) {
                return 'Студент'
            } else if (role_id === 2) {
                return 'Преподаватель'
            } else if (role_id === 1) {
                return 'Администратор'
            }
        },
    },

    actions: {
        async login(email, password) {
            const { data } = await $host.post('api/user/login', {
                email,
                password,
            })
            localStorage.setItem('token', data.token)
            const decodedData = jwtDecode(data.token)
            this.user = decodedData
            this.isAuth = true
            return decodedData
        },

        async check() {
            if (this.user.user_role_id) return

            const { data } = await $authhost.get('api/user/auth')
            localStorage.setItem('token', data.token)

            const decodedData = jwtDecode(data.token)
            this.user = decodedData
            this.isAuth = true
            return decodedData
        },

        async getUserInfo() {
            const { data } = await $authhost.get('api/user/info')
            return data
        },
    },
})
