<script setup>
import { watch, ref } from 'vue';
import { useGlobalStore } from '../stores/global';
import api from '../api';
import { Notyf } from 'notyf';
import { useRouter } from 'vue-router';

const store = useGlobalStore();
const { user, getUserDetails } = store;
const notyf = new Notyf();
const router = useRouter();

const movie = ref({
    title: '',
    director: '',
    year: '',
    description: '',
    genre: ''
});

async function handleSubmit() {
    try {
        let res = await api.post('/movies/addMovie', movie.value);
        notyf.success("Movie Added Successfully");
        router.push({ path: '/movies' });

        movie.value.title = '';
        movie.value.director = '';
        movie.value.year = '';
        movie.value.description = '';
        movie.value.genre = '';
    } catch (e) {
        console.error(e);
        notyf.error("Failed to add movie");
    }
}

</script>

<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <form @submit.prevent="handleSubmit" class="add-movie-form">
            <h2>Add New Movie</h2>

            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="movie.title" required>
            </div>

            <div class="mb-3">
                <label for="director" class="form-label">Director</label>
                <input type="text" class="form-control" id="director" v-model="movie.director" required>
            </div>

            <div class="mb-3">
                <label for="year" class="form-label">Year</label>
                <input type="number" class="form-control" id="year" v-model="movie.year" required>
            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" v-model="movie.description" required></textarea>
            </div>

            <div class="mb-3">
                <label for="genre" class="form-label">Genre</label>
                <input type="text" class="form-control" id="genre" v-model="movie.genre" required>
            </div>

            <button type="submit" class="btn btn-primary">Add Movie</button>
        </form>
    </div>
</template>