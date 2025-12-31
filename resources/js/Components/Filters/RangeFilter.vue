<template>
  <div class="range-filter space-y-2">
    <!-- Range Mode Toggle -->
    <div class="flex items-center space-x-2" v-if="filter.showModeToggle !== false">
      <button
        v-for="mode in rangeModes"
        :key="mode"
        @click="activeMode = mode"
        class="px-3 py-1 text-xs rounded-lg transition-colors"
        :class="activeMode === mode 
          ? 'bg-green-100 text-green-700 border border-green-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'"
      >
        {{ modeLabels[mode] }}
      </button>
    </div>
    
    <!-- Exact Value -->
    <div v-if="activeMode === 'exact'" class="space-y-1">
      <input
        type="number"
        :value="internalValue?.exact"
        @input="handleExactChange($event.target.value)"
        :placeholder="filter.placeholder || 'Enter value...'"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>
    
    <!-- Range -->
    <div v-else-if="activeMode === 'range'" class="grid grid-cols-2 gap-2">
      <div>
        <label class="block text-xs text-gray-500 mb-1">Min</label>
        <input
          type="number"
          :value="internalValue?.min"
          @input="handleMinChange($event.target.value)"
          placeholder="Minimum"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <label class="block text-xs text-gray-500 mb-1">Max</label>
        <input
          type="number"
          :value="internalValue?.max"
          @input="handleMaxChange($event.target.value)"
          placeholder="Maximum"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
    </div>
    
    <!-- Presets -->
    <div v-if="filter.presets && filter.presets.length > 0" class="pt-2 border-t border-gray-100">
      <div class="flex flex-wrap gap-1">
        <span class="text-xs text-gray-500 self-center mr-2">Presets:</span>
        <button
          v-for="preset in filter.presets"
          :key="preset.label"
          @click="applyPreset(preset)"
          class="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
        >
          {{ preset.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  filter: { type: Object, required: true },
  value: { type: [Object, Number, String], default: null }
})

const emit = defineEmits(['update'])

const rangeModes = ['exact', 'range']
const modeLabels = {
  exact: 'Exact',
  range: 'Range'
}

const activeMode = ref(props.filter.defaultMode || 'exact')
const internalValue = ref({})

// Initialize value - FIXED NULL CHECK
watch(() => props.value, (newVal) => {
  if (newVal && typeof newVal === 'object') {
    internalValue.value = newVal
    activeMode.value = (newVal.min !== undefined || newVal.max !== undefined) ? 'range' : 'exact'
  } else if (newVal !== null && newVal !== undefined && newVal !== '') {
    internalValue.value = { exact: newVal }
    activeMode.value = 'exact'
  } else {
    internalValue.value = {}
    activeMode.value = 'exact'
  }
}, { immediate: true })

const handleExactChange = (val) => {
  internalValue.value = { exact: val ? Number(val) : null }
  emitUpdate()
}

const handleMinChange = (val) => {
  internalValue.value = {
    ...internalValue.value,
    min: val ? Number(val) : null
  }
  emitUpdate()
}

const handleMaxChange = (val) => {
  internalValue.value = {
    ...internalValue.value,
    max: val ? Number(val) : null
  }
  emitUpdate()
}

const applyPreset = (preset) => {
  internalValue.value = typeof preset.value === 'function' 
    ? preset.value()
    : preset.value
  emitUpdate()
}

const emitUpdate = () => {
  // Clean up empty values
  const cleanValue = Object.fromEntries(
    Object.entries(internalValue.value)
      .filter(([_, v]) => v !== null && v !== undefined && v !== '')
  )
  
  if (Object.keys(cleanValue).length === 0) {
    emit('update', null)
  } else {
    emit('update', cleanValue)
  }
}
</script>