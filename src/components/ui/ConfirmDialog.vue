<template>
  <Teleport to="body">
    <div class="dialog-overlay" @click.self="$emit('cancel')">
      <div class="dialog" role="dialog" aria-modal="true">
        <div class="dialog__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="dialog__message">{{ message }}</p>
        <div class="dialog__actions">
          <button class="btn btn--ghost" @click="$emit('cancel')">Cancel</button>
          <button class="btn btn--danger" @click="$emit('confirm')">Delete</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
defineEmits<{ confirm: []; cancel: [] }>()
</script>
