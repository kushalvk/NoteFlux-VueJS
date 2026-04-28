<template>
  <div class="tag-badge" :class="{ removable }">
    <span class="tag-label"># {{ label }}</span>
    <button v-if="removable" class="tag-remove" @click.stop="$emit('remove')" aria-label="Remove tag">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; removable?: boolean }>()
defineEmits<{ remove: [] }>()
</script>
