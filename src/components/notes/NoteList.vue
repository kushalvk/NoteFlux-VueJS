<template>
  <div class="note-list">
    <TransitionGroup name="list" tag="div" class="note-list__inner">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :isActive="note.id === selectedNote"
        @select="store.selectNote($event)"
      />
    </TransitionGroup>
    <NoteEmpty v-if="notes.length === 0" context="list" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNoteStore } from '../../store/noteStore'
import NoteCard from './NoteCard.vue'
import NoteEmpty from './NoteEmpty.vue'

const store = useNoteStore()
const { notes, selectedNote } = storeToRefs(store)
</script>
