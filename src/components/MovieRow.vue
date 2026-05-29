<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';

const props = defineProps({
    title: String,
    genre: String
});

const movies = ref([]);
const rowRef = ref(null);

onMounted(async () => {
    const { data } = await api.get('/movies/getMovies');
    movies.value = props.genre
        ? data.movies.filter(m => m.genre.toLowerCase().includes(props.genre.toLowerCase()))
        : data.movies;
});

function getInitials(title) {
    return title.split(' ').slice(0, 2).map(w => w[0]).join('');
}

function scroll(direction) {
    rowRef.value.scrollBy({
        left: direction === 'left' ? -500 : 500,
        behavior: 'smooth'
    });
}
</script>

<template>
    <div class="movies-section">
        <div class="movies-section__header">
            <h2 class="movies-section__title">{{ title }}</h2>
            <div class="movies-section__arrows d-none d-md-flex">
                <button class="movies-arrow" @click="scroll('left')">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button class="movies-arrow" @click="scroll('right')">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="movies-row" ref="rowRef">
            <div
                v-for="movie in movies"
                :key="movie._id"
                class="movie-card"
                @click="$router.push({ name: 'MovieDetail', params: { id: movie._id } })"
            >
                <div class="movie-card__poster">
                    <span class="movie-card__initials">{{ getInitials(movie.title) }}</span>
                    <div class="movie-card__overlay">
                        <i class="bi bi-play-fill"></i>
                    </div>
                </div>
                <div class="movie-card__info">
                    <p class="movie-card__title">{{ movie.title }}</p>
                    <p class="movie-card__meta">{{ movie.director }} · {{ movie.year }}</p>
                    <span class="movie-card__genre">{{ movie.genre }}</span>
                    <div class="movie-card__comments">
                        <i class="bi bi-chat"></i>
                        {{ movie.comments.length }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>