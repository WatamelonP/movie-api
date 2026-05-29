<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '../stores/global';
import api from '../api';
import { Notyf } from 'notyf';

const route = useRoute();
const { user } = useGlobalStore();
const notyf = new Notyf();

const movie = ref(null);
const comment = ref('');
const isSubmitting = ref(false);

onMounted(async () => {
    const { data } = await api.get(`/movies/getMovie/${route.params.id}`);
    console.log(data)
    movie.value = data;
});

function getInitials(title) {
    return title.split(' ').slice(0, 2).map(w => w[0]).join('');
}

async function submitComment() {
    if (!comment.value.trim()) return;
    isSubmitting.value = true;
    try {
        await api.patch(`/movies/addComment/${route.params.id}`, {
            comment: comment.value
        });
        notyf.success('Comment added');
        comment.value = '';
        const { data } = await api.get(`/movies/getMovie/${route.params.id}`);
        movie.value = data; // ✅ not data.movie
    } catch (e) {
        console.error(e.response?.data);
        notyf.error('Failed to add comment');
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <div class="movie-detail" v-if="movie">

        <div class="movie-detail__hero">
            <div class="movie-detail__poster">
                <span class="movie-detail__initials">{{ getInitials(movie.title) }}</span>
            </div>
            <div class="movie-detail__meta">
                <span class="movie-card__genre">{{ movie.genre }}</span>
                <h1 class="movie-detail__title">{{ movie.title }}</h1>
                <p class="movie-detail__sub">
                    Directed by <strong>{{ movie.director }}</strong> · {{ movie.year }}
                </p>
                <p class="movie-detail__description">{{ movie.description }}</p>
            </div>
        </div>

        <div class="movie-detail__comments">
            <h2 class="movie-detail__comments-title">
                Comments
                <span class="movie-detail__comments-count">{{ movie.comments.length }}</span>
            </h2>

            <div v-if="user.email" class="movie-detail__comment-form">
                <textarea
                    v-model="comment"
                    class="movie-detail__textarea"
                    placeholder="Write a comment..."
                    rows="3"
                ></textarea>
                <button
                    class="btn-login"
                    style="width: auto; padding: 0 1.5rem;"
                    :disabled="!comment.trim() || isSubmitting"
                    @click="submitComment"
                >
                    <i class="bi bi-send"></i>
                    {{ isSubmitting ? 'Posting...' : 'Post comment' }}
                </button>
            </div>

            <p v-else class="movie-detail__login-prompt">
                <router-link :to="{ name: 'Login' }">Sign in</router-link> to leave a comment.
            </p>

            <div v-if="movie.comments.length === 0" class="movie-detail__no-comments">
                No comments yet. Be the first!
            </div>

            <div
                v-for="c in [...movie.comments].reverse()"
                :key="c._id"
                class="movie-detail__comment"
            >
                <div class="movie-detail__comment-avatar">
                    {{ c.userId.slice(-2).toUpperCase() }}
                </div>
                <div class="movie-detail__comment-body">
                    <p class="movie-detail__comment-user">User {{ c.userId.slice(-4) }}</p>
                    <p class="movie-detail__comment-text">{{ c.comment }}</p>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="movie-detail__loading">
        <div class="spinner-border text-danger" role="status"></div>
    </div>
</template>