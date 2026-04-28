<template>
  <div class="note-editor" v-if="note">
    <div class="note-editor__toolbar">
      <div class="note-editor__meta">
        <span class="note-editor__date">Last edited {{ formatDate(note.updatedAt) }}</span>
        <button
          class="btn btn--icon"
          :class="{ active: note.isPinned }"
          @click="store.updateNote(note.id, { isPinned: !note.isPinned })"
          :title="note.isPinned ? 'Unpin' : 'Pin note'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2z"/>
          </svg>
        </button>
        <button class="btn btn--icon btn--danger-hover" @click="showDeleteDialog = true" title="Delete note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <input
      ref="titleRef"
      class="note-editor__title"
      type="text"
      placeholder="Note title…"
      maxlength="100"
      :value="note.title"
      @input="store.updateNote(note.id, { title: ($event.target as HTMLInputElement).value })"
    />

    <TagInput
      class="note-editor__tags"
      :modelValue="note.tags"
      @update:modelValue="store.updateNote(note.id, { tags: $event })"
    />

    <textarea
      class="note-editor__body"
      placeholder="Start writing…"
      :value="note.content"
      @input="store.updateNote(note.id, { content: ($event.target as HTMLTextAreaElement).value })"
    />

    <ConfirmDialog
      v-if="showDeleteDialog"
      message="Delete this note? This cannot be undone."
      @confirm="onDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>

  <NoteEmpty v-else context="editor" />
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useNoteStore } from '../../store/noteStore'
import { formatDate } from '../../utils/date'
import TagInput from '../ui/TagInput.vue'
import ConfirmDialog from '../ui/ConfirmDialog.vue'
import NoteEmpty from './NoteEmpty.vue'

const store = useNoteStore()
const { activeNote: note } = storeToRefs(store)
const showDeleteDialog = ref(false)
const titleRef = ref<HTMLInputElement | null>(null)

watch(
  () => note.value?.id,
  async () => {
    if (note.value && !note.value.title) {
      await nextTick()
      titleRef.value?.focus()
    }
  }
)

function onDelete() {
  if (note.value) store.deleteNote(note.value.id)
  showDeleteDialog.value = false
}
</script>
