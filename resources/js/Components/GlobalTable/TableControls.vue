<template>
  <div class="table-controls flex flex-col md:flex-row flex-wrap items-center gap-3 md:gap-4 p-4 border-b border-gray-200 bg-gray-50 relative z-30">
    <!-- Row Selection Controls -->
    <div class="relative flex items-center" v-if="enableRowSelection">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          :checked="allRowsSelected"
          @change="$emit('toggle-select-all')"
          class="rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <span class="ml-2 text-sm text-gray-700">Select All</span>
      </label>
      <span v-if="selectedRows.length > 0" class="bg-green-50 px-2 py-1 rounded text-xs ml-2 text-green-700">
        {{ selectedRows.length }} selected
      </span>
    </div>

    <!-- Column Visibility Controls -->
    <div class="relative flex items-center" v-if="showColumnSelectorProp">
      <button
        @click="toggleColumnSelector"
        class="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
        :class="{ 'bg-green-50 border-green-300 text-green-700 shadow-md': showColumnSelector }"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
        </svg>
        Columns
      </button>

      <!-- Column Selector Dropdown -->
      <div v-if="showColumnSelector" class="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
        <div class="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <h3 class="text-sm font-semibold">Show/Hide Columns</h3>
          <button @click="$emit('reset-columns')" class="text-xs text-green-600 hover:text-green-700">
            Reset All
          </button>
        </div>
        <div class="max-h-64 overflow-y-auto">
          <div
            v-for="column in allColumns"
            :key="column.key"
            class="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
            :class="{ 'opacity-50': !isColumnVisible(column.key) }"
          >
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                :checked="isColumnVisible(column.key)"
                @change="$emit('toggle-column-visibility', column.key)"
                class="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span class="text-sm text-gray-700">{{ column.label }}</span>
            </label>
            <div class="flex space-x-1">
              <button
                @click.stop="$emit('move-column', column.key, -1)"
                :disabled="!canMoveLeft(column.key)"
                class="w-6 h-6 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ←
              </button>
              <button
                @click.stop="$emit('move-column', column.key, 1)"
                :disabled="!canMoveRight(column.key)"
                class="w-6 h-6 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Controls -->
    <div class="relative flex items-center" v-if="showFiltersProp">
      <button
        @click="toggleFilters"
        class="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
        :class="{ 'bg-green-50 border-green-300 text-green-700 shadow-md': showFilters }"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
        </svg>
        Filters
        <span v-if="activeFilterCount > 0" class="ml-2 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full font-medium">
          {{ activeFilterCount }}
        </span>
      </button>
    </div>

    <!-- Search -->
    <div class="relative flex items-center flex-1 w-full md:flex-none md:max-w-md">
      <div class="relative flex items-center w-full">
        <svg class="absolute left-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          :value="searchQuery"
          @input="$emit('update-search', $event.target.value)"
          type="text"
          placeholder="Search across all columns..."
          class="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
        />
        <button
          v-if="searchQuery"
          @click="$emit('clear-search')"
          class="absolute right-2 w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div class="relative flex items-center" v-if="enableRowSelection && selectedRows.length > 0">
      <select v-model="localBulkAction" class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" @change="handleBulkAction">
        <option value="">Actions</option>
        <option value="delete">Delete Selected</option>
        <option value="export">Export Selected</option>
        <option value="mark-active">Mark as Active</option>
        <option value="mark-inactive">Mark as Inactive</option>
      </select>
    </div>

    <!-- Export Button -->
    <div class="relative flex items-center" v-if="showExport">
      <button @click="$emit('export-data')" class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Export
      </button>
    </div>

    <!-- Refresh Button -->
    <div class="relative flex items-center">
      <button @click="$emit('refresh')" class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Refresh
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  enableRowSelection: { type: Boolean, default: false },
  selectedRows: { type: Array, default: () => [] },
  allRowsSelected: { type: Boolean, default: false },
  allColumns: { type: Array, default: () => [] },
  visibleColumns: { type: Array, default: () => [] },
  showColumnSelector: { type: Boolean, default: false },
  showFilters: { type: Boolean, default: false },
  availableFilters: { type: Array, default: () => [] },
  activeFilterCount: { type: Number, default: 0 },
  searchQuery: { type: String, default: '' },
  bulkAction: { type: String, default: '' },
  showExport: { type: Boolean, default: true },
  showColumnSelectorProp: { type: Boolean, default: true },
  showFiltersProp: { type: Boolean, default: true }
})

const emit = defineEmits([
  'toggle-select-all',
  'toggle-column-selector',
  'toggle-filters',
  'update-search',
  'clear-search',
  'perform-bulk-action',
  'export-data',
  'refresh',
  'reset-columns',
  'toggle-column-visibility',
  'move-column'
])

const localBulkAction = ref(props.bulkAction)
const localShowColumnSelector = ref(false)
const localShowFilters = ref(false)

watch(() => props.bulkAction, (newValue) => {
  localBulkAction.value = newValue
})

watch(() => props.showColumnSelector, (newValue) => {
  localShowColumnSelector.value = newValue
})

watch(() => props.showFilters, (newValue) => {
  localShowFilters.value = newValue
})

const isColumnVisible = (key) => {
  return props.visibleColumns.some(col => col.key === key)
}

const canMoveLeft = (key) => {
  const visibleKeys = props.visibleColumns.map(col => col.key)
  const index = visibleKeys.indexOf(key)
  return index > 0
}

const canMoveRight = (key) => {
  const visibleKeys = props.visibleColumns.map(col => col.key)
  const index = visibleKeys.indexOf(key)
  return index < visibleKeys.length - 1 && index !== -1
}

const toggleColumnSelector = (event) => {
  event.stopPropagation()
  emit('toggle-column-selector')
}

const toggleFilters = (event) => {
  event.stopPropagation()
  emit('toggle-filters')
}

const handleBulkAction = () => {
  if (localBulkAction.value) {
    emit('perform-bulk-action', localBulkAction.value)
    localBulkAction.value = ''
  }
}
</script>

<style scoped>
.table-controls {
  position: relative;
  z-index: 30;
}

/* Ensure dropdowns appear above everything */
.absolute {
  z-index: 9999;
}

/* Prevent clicks from propagating to parent */
button, select, input {
  position: relative;
  z-index: 1;
}
</style>