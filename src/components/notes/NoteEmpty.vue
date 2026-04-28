<template>
  <div class="note-empty">
    <div class="note-empty__illustration">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="10" y="8" width="60" height="64" rx="6" fill="var(--surface-2)" stroke="var(--border)" stroke-width="2"/>
        <rect x="20" y="22" width="40" height="3" rx="1.5" fill="var(--text-muted)"/>
        <rect x="20" y="30" width="32" height="3" rx="1.5" fill="var(--text-muted)" opacity=".6"/>
        <rect x="20" y="38" width="36" height="3" rx="1.5" fill="var(--text-muted)" opacity=".4"/>
        <circle cx="40" cy="58" r="10" fill="var(--accent)" opacity=".15"/>
        <path d="M36 58h8M40 54v8" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <template v-if="context === 'list'">
      <h2 class="note-empty__title">No notes found</h2>
      <p class="note-empty__sub">Try a different search or create a new note.</p>
    </template>
    <template v-else>
      <h2 class="note-empty__title">Select a note</h2>
      <p class="note-empty__sub">Choose a note from the sidebar or create one.</p>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{ context?: 'list' | 'editor' }>()
</script>
