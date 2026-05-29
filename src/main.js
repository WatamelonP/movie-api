import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import { useGlobalStore } from './stores/global'
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'

import 'notyf/notyf.min.css';

import './style.css'




import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LogoutPage from './pages/LogoutPage.vue';
import MoviesPage from './pages/MoviesPage.vue';
import MovieDetailPage from './pages/MovieDetailPage.vue'
import AddMoviePage from './pages/AddMoviePage.vue'
const pinia = createPinia()

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage
        },
        {
            path: '/movies',
            name: 'Movies',
            component: MoviesPage
        },
        {
            path: '/movies/:id',
            name: 'MovieDetail',
            component: MovieDetailPage
        },
        {
            path: '/addMovie',
            name: 'AddMovie',
            component: AddMoviePage
        }

        // {
        //         path: "/:catchAll(.*)",
        //         component: ErrorPage,
        // }

    ]
})
const app = createApp(App)
app.use(pinia)

router.beforeEach((to, from, next) => {
    const { user } = useGlobalStore()
    const token = user.token || localStorage.getItem('token')

    const guestOnly = ['Login', 'Register', 'Home']
    const authOnly = ['Logout', 'MovieDetail', 'Movies']

    if (guestOnly.includes(to.name) && token) {
        return next({ name: 'Movies' })
    }

    if (authOnly.includes(to.name) && !token) {
        return next({ name: 'Login' })
    }

    return next()
})

app.use(router).mount('#app')
