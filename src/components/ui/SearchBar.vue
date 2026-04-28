<template>
  <div class="search-bar">
    <svg class="search-bar__icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
      <path d="M20 20L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <input
      id="search-input"
      class="search-bar__input"
      type="search"
      :value="modelValue"
      placeholder="Search notes…"
      autocomplete="off"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      class="search-bar__clear"
      @click="$emit('update:modelValue', '')"
      aria-label="Clear search"
    >
      <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
        <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
