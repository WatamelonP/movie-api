<script setup>
import { useGlobalStore } from "../stores/global";
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
const store = useGlobalStore();
const { user, isDark } = storeToRefs(store);
const { toggleDark } = store;   
const email = ref("");
const emit = defineEmits(['open-reset'])
</script>

<template>
  <nav class="app-navbar fixed-top navbar navbar-expand-lg">
    <div class="container">

      <router-link :to="{ name: 'Home' }" class="app-navbar__brand navbar-brand">
        TV+ and CHILL
      </router-link>

      <button class="navbar-toggler app-navbar__toggler" type="button"
        data-bs-toggle="collapse" data-bs-target="#mainNav"
        aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">
        <div class="navbar-nav ms-auto align-items-center gap-3">

          <button @click="toggleDark()" class="app-navbar__theme-btn">
            <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
          </button>

          <div class="dropdown">
            
            <button class="app-navbar__menu-btn dropdown-toggle" type="button"
              data-bs-toggle="dropdown" aria-expanded="false">
             Menu
            </button>
            <ul class="dropdown-menu dropdown-menu-end app-navbar__dropdown">
                <li v-if="user.isAdmin">
                    <button class="dropdown-item app-navbar__dropdown-item"
                      @click="$router.push({ name: 'AddMovie' })">Add Movie</button>
                </li>
              <li v-if="user.email">
                <button class="dropdown-item app-navbar__dropdown-item"
                  @click="$router.push({ name: 'Logout' })">Logout</button>
              </li>
              <li v-if="!user.email">
                <button class="dropdown-item app-navbar__dropdown-item"
                  @click="$router.push({ name: 'Register' })">Register</button>
              </li>
              <li v-if="!user.email">
                <button class="dropdown-item app-navbar__dropdown-item"
                  @click="$router.push({ name: 'Login' })">Login</button>
              </li>
            </ul>
        </div>
        </div>
      </div>
    </div>
  </nav>
</template>
