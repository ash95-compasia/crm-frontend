<template>
  <div class="select-filter">
    <select
      :value="value"
      @change="$emit('update', $event.target.value)"
      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
    >
      <option value="">{{ filter.placeholder || 'All' }}</option>
      <option
        v-for="option in filter.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  filter: { type: Object, required: true },
  value: { type: [String, Number, Boolean], default: '' }
})

defineEmits(['update'])
</script>