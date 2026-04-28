<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__brand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="sidebar__logo-text">NoteFlux</span>
      </div>
      <button id="new-note-btn" class="btn btn--primary" @click="store.addNote({ title: '', content: '', tags: [] })">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        <span class="btn__label">New</span>
      </button>
    </div>

    <!-- updated SearchBar binding -->
    <SearchBar :modelValue="store.searchQuery" @update:modelValue="store.searchNotes" class="sidebar__search" />

    <TagFilter />

    <div class="sidebar__notes-header">
      <p class="sidebar__section-label">
        Notes
        <span class="sidebar__count">{{ store.notes.length }}</span>
      </p>
    </div>

    <div class="sidebar__list">
      <NoteList />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useNoteStore } from '../../store/noteStore'
import SearchBar from '../ui/SearchBar.vue'
import TagFilter from '../notes/TagFilter.vue'
import NoteList from '../notes/NoteList.vue'

const store = useNoteStore()
</script>
