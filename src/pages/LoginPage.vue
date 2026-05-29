<script setup>
import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../stores/global';
import api from '../api';
import { Notyf } from 'notyf';


const store = useGlobalStore();
const notyf = new Notyf();
const router = useRouter();
const { getUserDetails } = store;
const email = ref("");
const password = ref("");
const isEnabled = ref(false);

watch([email, password], (currentValue) => {
    isEnabled.value = currentValue.every(input => input !== "");
});

async function handleSubmit() {
    try {
        let res = await api.post('/users/login', {
            email: email.value,
            password: password.value
        });
        if (res.data.access) {
            notyf.success("Login Successful");
            localStorage.setItem("token", res.data.access);
            await getUserDetails(res.data.access);
            email.value = "";
            password.value = "";
            router.push({ path: '/movies' });
        }
    } catch (e) {
        if (e.response?.status === 401) {
            notyf.error(e.response.data.message);
        } else {
            console.error(e);
            notyf.error("Login Failed. Please contact administrator.");
        }
    }
}
</script>

<template>
    <div class="login-wrap">
        <div class="login-card">
            <p class="brand"><span>TV+</span> and CHILL</p>
            <p class="subtitle">Sign in to continue watching</p>

            <form @submit.prevent="handleSubmit">
                <div class="field">
                    <label for="userEmail">Email address</label>
                    <input type="text" id="userEmail" placeholder="you@example.com" v-model="email" />
                </div>
                <div class="field">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="••••••••" v-model="password" />
                </div>

                <button type="submit" class="btn-login" :disabled="!isEnabled">
                    <i class="ti ti-login" aria-hidden="true"></i>
                    Sign in
                </button>
            </form>
            <p class="footer-link">New here? <router-link :to="{ name: 'Register' }">Create an account</router-link></p>
        </div>
    </div>
</template>