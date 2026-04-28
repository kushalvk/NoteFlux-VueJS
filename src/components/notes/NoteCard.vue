<template>
  <div
    class="note-card"
    :class="{ active: isActive, pinned: note.isPinned }"
    @click="$emit('select', note.id)"
  >
    <div class="note-card__header">
      <span class="note-card__pin" v-if="note.isPinned" title="Pinned">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2z"/>
        </svg>
      </span>
      <h3 class="note-card__title">{{ note.title || 'Untitled' }}</h3>
      <button
        class="note-card__delete"
        @click.stop="showDialog = true"
        aria-label="Delete note"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <p class="note-card__preview">{{ preview }}</p>
    <div class="note-card__footer">
      <div class="note-card__tags">
        <TagBadge v-for="tag in note.tags.slice(0, 3)" :key="tag" :label="tag" />
        <span v-if="note.tags.length > 3" class="tag-overflow">+{{ note.tags.length - 3 }}</span>
      </div>
      <span class="note-card__date">{{ formatDate(note.updatedAt) }}</span>
    </div>

    <ConfirmDialog
      v-if="showDialog"
      message="Delete this note? This cannot be undone."
      @confirm="onDelete"
      @cancel="showDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Note } from '../../types/note.types'
import { formatDate } from '../../utils/date'
import TagBadge from '../ui/TagBadge.vue'
import ConfirmDialog from '../ui/ConfirmDialog.vue'
import { useNoteStore } from '../../store/noteStore'

const props = defineProps<{ note: Note; isActive: boolean }>()
defineEmits<{ select: [id: string] }>()

const store = useNoteStore()
const showDialog = ref(false)

const preview = computed(() =>
  props.note.content.replace(/\n/g, ' ').slice(0, 120) || 'No content yet…'
)

function onDelete() {
  store.deleteNote(props.note.id)
  showDialog.value = false
}
</script>
