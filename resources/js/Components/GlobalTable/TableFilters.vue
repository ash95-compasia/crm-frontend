<template>
  <div class="table-filters bg-white border-b border-gray-200 shadow-sm" v-if="showFiltersPanel">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-gray-900">Filters</h3>
        <div class="flex items-center space-x-3">
          <button
            @click="$emit('clear-all-filters')"
            class="text-xs text-gray-600 hover:text-gray-700 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            @click="$emit('apply-filters')"
            class="text-xs text-green-600 hover:text-green-700 px-3 py-1 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
          >
            Apply
          </button>
          <button
            @click="$emit('close-filters')"
            class="text-xs text-gray-600 hover:text-gray-700"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <!-- Quick Filter Chips -->
        <div v-if="quickFilters.length > 0" class="col-span-full">
          <div class="flex flex-wrap gap-2">
            <span class="text-xs font-medium text-gray-500 self-center">Quick Filters:</span>
            <button
              v-for="filter in quickFilters"
              :key="filter.key"
              @click="applyQuickFilter(filter)"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
        
        <!-- Dynamic Filter Inputs -->
        <div
          v-for="filter in filters"
          :key="filter.key"
          class="space-y-1"
        >
          <label class="block text-xs font-medium text-gray-700 uppercase tracking-wide">
            {{ filter.label }}
            <span v-if="filter.description" class="text-xs text-gray-500 normal-case font-normal">
              ({{ filter.description }})
            </span>
          </label>
          
          <component
            :is="getFilterComponent(filter.type)"
            :filter="filter"
            :value="activeFilters[filter.key]"
            @update="$emit('update-filter', filter.key, $event)"
            class="w-full"
          />
          
          <!-- Filter Actions -->
          <div v-if="activeFilters[filter.key]" class="flex items-center space-x-2 text-xs">
            <button
              @click="$emit('update-filter', filter.key, null)"
              class="text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
            <span class="text-gray-400">|</span>
            <button
              v-if="filter.presets"
              @click="showFilterPresets(filter)"
              class="text-green-600 hover:text-green-700"
            >
              Presets
            </button>
          </div>
        </div>
      </div>
      
      <!-- Advanced Filter Section -->
      <div v-if="hasAdvancedFilters" class="mt-4 pt-4 border-t border-gray-200">
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Advanced Filters</h4>
          <button
            @click="toggleAdvancedFilters"
            class="text-xs text-blue-600 hover:text-blue-700"
          >
            {{ showAdvancedFilters ? 'Hide' : 'Show' }}
          </button>
        </div>
        
        <div v-if="showAdvancedFilters" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Advanced filter inputs would go here -->
          <div class="text-sm text-gray-500 italic">
            Advanced filter options coming soon...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getFilterComponent } from '@/components/filters'

const props = defineProps({
  filters: { type: Array, default: () => [] },
  activeFilters: { type: Object, default: () => ({}) },
  showFiltersPanel: { type: Boolean, default: false }
})

const emit = defineEmits(['update-filter', 'apply-filters', 'clear-all-filters', 'close-filters'])

const showAdvancedFilters = ref(false)

// FIXED: Use props.filters instead of just props
const quickFilters = computed(() => {
  return props.filters.filter(f => f.quickFilter)
})

const hasAdvancedFilters = computed(() => {
  return props.filters.some(f => f.advanced)
})

const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value
}

const applyQuickFilter = (filter) => {
  // Logic to apply quick filter preset
  console.log('Apply quick filter:', filter)
  // You would implement preset logic here
}

const showFilterPresets = (filter) => {
  console.log('Show presets for:', filter)
  // Implement presets modal
}
</script>

<style scoped>
.table-filters {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>