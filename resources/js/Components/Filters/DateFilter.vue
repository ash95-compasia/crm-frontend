<template>
  <div class="date-filter">
    <input
      type="date"
      :value="value"
      @input="$emit('update', $event.target.value)"
      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
    />
    <div v-if="filter.showPresets" class="flex flex-wrap gap-1 mt-2">
      <button
        v-for="preset in presets"
        :key="preset.label"
        @click="applyPreset(preset)"
        class="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
      >
        {{ preset.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  filter: { type: Object, required: true },
  value: { type: [String, Date], default: '' }
})

defineEmits(['update'])

const presets = [
  { label: 'Today', value: new Date().toISOString().split('T')[0] },
  { label: 'Yesterday', value: () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date.toISOString().split('T')[0]
  }},
  { label: 'Last 7 Days', value: () => {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date.toISOString().split('T')[0]
  }}
]

const applyPreset = (preset) => {
  const value = typeof preset.value === 'function' ? preset.value() : preset.value
  emit('update', value)
}
</script>