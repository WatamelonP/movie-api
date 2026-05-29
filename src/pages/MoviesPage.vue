<script setup>
import MovieRow from '../components/MovieRow.vue';
</script>

<template>
    <div>
        <MovieRow title="All Movies" />
        <MovieRow title="Drama" genre="Drama" />
        <MovieRow title="Action" genre="Action" />
        <MovieRow title="Adventure" genre="Adventure" />
    </div>
</template>