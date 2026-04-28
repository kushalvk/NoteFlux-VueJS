<template>
  <div class="home-view">
    <NoteEditor />
  </div>
</template>

<script setup lang="ts">
import NoteEditor from '../components/notes/NoteEditor.vue'
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
</style>
