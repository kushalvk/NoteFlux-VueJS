<template>
  <div class="app-shell">
    <AppSidebar />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './components/layout/AppSidebar.vue'
</script>
