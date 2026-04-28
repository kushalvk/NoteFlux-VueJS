import { ref, computed } from 'vue'

export function useSearch<T>(
  items: () => T[],
  searchFn: (item: T, query: string) => boolean,
  debounceMs = 250
) {
  const query = ref('')
  let timer: ReturnType<typeof setTimeout>

  function setQuery(val: string) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      query.value = val
    }, debounceMs)
  }

  const results = computed(() => {
    if (!query.value.trim()) return items()
    return items().filter((item) => searchFn(item, query.value.toLowerCase()))
  })

  return { query, setQuery, results }
}
