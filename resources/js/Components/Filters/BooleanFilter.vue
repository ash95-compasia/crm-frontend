<template>
  <div class="boolean-filter">
    <div class="flex space-x-2">
      <button
        v-for="option in options"
        :key="option.value"
        @click="$emit('update', option.value)"
        class="flex-1 px-3 py-2 text-sm border rounded-lg transition-colors"
        :class="isActive(option.value) 
          ? 'bg-green-100 text-green-700 border-green-300' 
          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  filter: { type: Object, required: true },
  value: { type: [Boolean, String], default: null }
})

defineEmits(['update'])

const options = [
  { label: 'All', value: null },
  { label: 'Yes', value: true },
  { label: 'No', value: false }
]

const isActive = (value) => {
  return props.value === value
}
</script>