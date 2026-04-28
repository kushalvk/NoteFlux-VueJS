<template>
  <div class="tag-input">
    <div class="tag-input__chips">
      <TagBadge
        v-for="tag in modelValue"
        :key="tag"
        :label="tag"
        :removable="true"
        @remove="removeTag(tag)"
      />
    </div>
    <input
      class="tag-input__field"
      v-model="inputVal"
      placeholder="Add tag, press Enter…"
      @keydown.enter.prevent="addTag"
      @keydown.comma.prevent="addTag"
      @keydown.backspace="onBackspace"
      @blur="addTag"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TagBadge from './TagBadge.vue'

const props = defineProps<{ modelValue: string[] }>()
const emit = defineEmits<{ 'update:modelValue': [tags: string[]] }>()

const inputVal = ref('')

function addTag() {
  const raw = inputVal.value.trim().toLowerCase().replace(/,/g, '')
  if (raw && !props.modelValue.includes(raw)) {
    emit('update:modelValue', [...props.modelValue, raw])
  }
  inputVal.value = ''
}

function removeTag(tag: string) {
  emit('update:modelValue', props.modelValue.filter((t) => t !== tag))
}

function onBackspace() {
  if (!inputVal.value && props.modelValue.length > 0) {
    removeTag(props.modelValue[props.modelValue.length - 1])
  }
}
</script>
