import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Note, NoteUpdatePayload } from '../types/note.types'
import {
  getNotes,
  createNote as svcCreate,
  updateNote as svcUpdate,
  deleteNote as svcDelete,
  searchNotes as svcSearch,
  sortNotes
} from '../services/noteService'

export const useNoteStore = defineStore('note', () => {
  // State
  const notes = ref<Note[]>([])
  const selectedNote = ref<string | null>(null)
  const searchQuery = ref('')
  
  // Actions
  function loadNotes() {
    if (searchQuery.value.trim() === '') {
      notes.value = sortNotes(getNotes())
    } else {
      notes.value = sortNotes(svcSearch(searchQuery.value))
    }
  }

  function addNote(payload: { title: string; content: string; tags: string[] }) {
    const note = svcCreate(payload)
    loadNotes() // re-fetch and sort
    selectedNote.value = note.id
  }

  function updateNote(id: string, payload: NoteUpdatePayload) {
    svcUpdate(id, payload)
    loadNotes() // re-fetch and sort
  }

  function deleteNote(id: string) {
    svcDelete(id)
    if (selectedNote.value === id) {
      selectedNote.value = null
    }
    loadNotes() // re-fetch and sort
  }

  function selectNote(id: string | null) {
    selectedNote.value = id
  }

  function searchNotes(query: string) {
    searchQuery.value = query
    loadNotes()
  }

  // Active note computed getter to easily access the currently selected Note object
  const activeNote = computed(() => notes.value.find(n => n.id === selectedNote.value))

  // Auto-load on initialization
  loadNotes()

  return {
    notes,
    selectedNote,
    searchQuery,
    loadNotes,
    addNote,
    updateNote,
    deleteNote,
    selectNote,
    searchNotes,
    activeNote
  }
})
