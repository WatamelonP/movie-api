<script setup>
import './style.css'
import NavbarComponent from './components/NavBarComponent.vue';
import { useGlobalStore } from './stores/global.js';
import { onBeforeMount } from 'vue';
import { ref } from 'vue'
const showResetModal = ref(false)
const { getUserDetails } = useGlobalStore();
onBeforeMount(() => getUserDetails(localStorage.getItem("token")));
</script>

<template>
  <NavbarComponent @open-reset="showResetModal = true" />
  <router-view />
</template>
