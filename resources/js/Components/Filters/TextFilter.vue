<template>
  <div class="text-filter">
    <input
      type="text"
      :value="value"
      @input="$emit('update', $event.target.value)"
      :placeholder="filter.placeholder || 'Filter...'"
      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
    />
    <div v-if="filter.hint" class="text-xs text-gray-500 mt-1">
      {{ filter.hint }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  filter: { type: Object, required: true },
  value: { type: [String, Number], default: '' }
})

defineEmits(['update'])
</script>