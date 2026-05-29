import { defineStore } from 'pinia';
import { reactive, computed, ref } from 'vue';
import api from '../api';

export const useGlobalStore = defineStore('global', () => {
    let user = ref({
        token: localStorage.getItem('token'),
        email: "",
        isAdmin: false
    });

    async function getUserDetails(token) {
        if (!token) {
            user.value.token = "";
            user.value.email = "";
            user.value.isAdmin = false;
            return;
        }
        let { data } = await api.get('/users/details');
        user.value.token = token;
        user.value.email = data.user.email;
        user.value.isAdmin = data.user.isAdmin;
    }

    getUserDetails(user.value.token);

    const isDark = ref(true)
    document.documentElement.classList.add('dark')

    function toggleDark() {
        isDark.value = !isDark.value
        document.documentElement.classList.toggle('dark', isDark.value)
    }

    return {
        user,
        getUserDetails,
        isDark,
        toggleDark
    };
});