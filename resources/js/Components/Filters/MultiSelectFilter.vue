<template>
  <div class="multi-select-filter">
    <div class="relative">
      <select
        :value="selectedValues"
        @change="handleSelect"
        multiple
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        :size="Math.min(filter.options.length + 1, 6)"
      >
        <option value="">All</option>
        <option
          v-for="option in filter.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div v-if="selectedValues.length > 0" class="absolute top-2 right-2">
        <button
          @click="clearSelection"
          class="text-xs text-gray-500 hover:text-gray-700"
          title="Clear selection"
        >
          ×
        </button>
      </div>
    </div>
    <div v-if="selectedValues.length > 0" class="flex flex-wrap gap-1 mt-2">
      <span class="text-xs text-gray-500">Selected: {{ selectedValues.length }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  filter: { type: Object, required: true },
  value: { type: [Array, String], default: () => [] }
})

const emit = defineEmits(['update'])

const selectedValues = ref([])

// Initialize
watch(() => props.value, (newVal) => {
  if (Array.isArray(newVal)) {
    selectedValues.value = newVal
  } else if (newVal) {
    selectedValues.value = [newVal]
  } else {
    selectedValues.value = []
  }
}, { immediate: true })

const handleSelect = (event) => {
  const options = Array.from(event.target.selectedOptions)
  selectedValues.value = options.map(option => option.value).filter(v => v !== '')
  
  if (selectedValues.value.length === 0) {
    emit('update', null)
  } else {
    emit('update', selectedValues.value)
  }
}

const clearSelection = () => {
  selectedValues.value = []
  emit('update', null)
}
</script>