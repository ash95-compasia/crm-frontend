<template>
  <div class="number-filter">
    <input
      type="number"
      :value="value"
      @input="$emit('update', $event.target.value)"
      :placeholder="filter.placeholder || 'Enter number...'"
      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      :min="filter.min"
      :max="filter.max"
      :step="filter.step || 'any'"
    />
  </div>
</template>

<script setup>
defineProps({
  filter: { type: Object, required: true },
  value: { type: [String, Number], default: '' }
})

defineEmits(['update'])
</script>