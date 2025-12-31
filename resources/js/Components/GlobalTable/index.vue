<template>
  <div class="global-table">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center p-12 text-center">
      <div class="w-8 h-8 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600">Loading data...</p>
    </div>
    
    <!-- Table Container -->
    <div v-else class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden relative">
      <!-- Table Controls -->
      <TableControls
        :enable-row-selection="enableRowSelection"
        :selected-rows="selectedRows"
        :all-rows-selected="allRowsSelected"
        :all-columns="allColumns"
        :visible-columns="visibleColumns"
        :show-column-selector="showColumnSelector"
        :show-filters="showFilters"
        :available-filters="availableFilters"
        :active-filter-count="activeFilterCount"
        :search-query="searchQuery"
        :bulk-action="bulkAction"
        :show-export="showExport"
        :show-column-selector-prop="showColumnSelectorProp"
        :show-filters-prop="showFiltersProp"
        @toggle-select-all="toggleSelectAll"
        @toggle-column-selector="toggleColumnSelector"
        @toggle-filters="toggleFilters"
        @update-search="updateSearch"
        @clear-search="clearSearch"
        @perform-bulk-action="performBulkAction"
        @export-data="handleExport"
        @refresh="handleRefresh"
        @reset-columns="resetColumns"
        @toggle-column-visibility="toggleColumnVisibility"
        @move-column="moveColumn"
      />
      
      <!-- Dynamic Filter Panel -->
      <TableFilters
        v-if="showFilters"
        :filters="availableFilters"
        :active-filters="activeFilters"
        :show-filters-panel="showFilters"
        @update-filter="updateFilter"
        @apply-filters="applyFilters"
        @clear-all-filters="clearAllFilters"
        @close-filters="showFilters = false"
        class="border-b border-gray-200 relative z-40"
      />
      
      <!-- Table -->
      <div class="overflow-x-auto" :class="{'max-h-96 overflow-y-auto': !virtualScroll}">
        <table class="min-w-full divide-y divide-gray-200">
          <TableHeader
            :visible-columns="visibleColumns"
            :sort-by="sortBy"
            :sort-order="sortOrder"
            :enable-row-selection="enableRowSelection"
            :all-rows-selected="allRowsSelected"
            :column-widths="columnWidths"
            @sort="handleSort"
            @toggle-select-all="toggleSelectAll"
            @toggle-column-visibility="toggleColumnVisibility"
            @move-column="moveColumn"
            @start-resize="startResize"
            @auto-resize-column="autoResizeColumn"
          />
          
          <TableBody
            :paginated-data="paginatedData"
            :visible-columns="visibleColumns"
            :enable-row-selection="enableRowSelection"
            :enable-expandable-rows="enableExpandableRows"
            :selected-rows="selectedRows"
            :expanded-rows="expandedRows"
            :is-empty="filteredData.length === 0"
            :has-active-filters="hasActiveFilters"
            :get-nested-value="getNestedValue"
            :format-value="formatValue"
            :column-widths="columnWidths"
            @row-click="handleRowClick"
            @row-select="toggleRowSelection"
            @row-expand="toggleRowExpansion"
            @clear-filters-and-search="clearAllFiltersAndSearch"
          >
            <!-- Scoped slots for custom cell content -->
            <template v-for="column in columns" #[`column-${column.key}`]="{ value, row, column: col }">
              <slot :name="`column-${column.key}`" :value="value" :row="row" :column="col" />
            </template>
            
            <!-- Scoped slots for expanded rows -->
            <template v-for="rowId in expandedRows" #[`expanded-${rowId}`]="{ row }">
              <slot :name="`expanded-${rowId}`" :row="row" />
            </template>
          </TableBody>
        </table>
      </div>
      
      <!-- Resize Overlay -->
      <div 
        v-if="isResizing" 
        class="fixed top-0 bottom-0 w-0.5 bg-green-500 pointer-events-none z-50 shadow-lg"
        :style="{ left: resizeOverlayLeft + 'px' }"
      ></div>
      
      <!-- Pagination -->
      <TablePagination
        v-if="showPagination && filteredData.length > 0 && !virtualScroll"
        :current-page="currentPage"
        :page-size="pageSize"
        :total-items="filteredData.length"
        :start-item="startItem"
        :end-item="endItem"
        :visible-pages="visiblePages"
        :total-pages="totalPages"
        :page-size-options="pageSizeOptions"
        @previous-page="previousPage"
        @next-page="nextPage"
        @go-to-page="goToPage"
        @update-page-size="updatePageSize"
      />
      
      <!-- Debug info (remove in production) -->
      <div v-if="debug" class="p-2 bg-gray-100 text-xs text-gray-600 border-t">
        <div>Total: {{ props.data.length }} | Filtered: {{ filteredData.length }} | Showing: {{ paginatedData.length }}</div>
        <div v-if="searchQuery">Search: "{{ searchQuery }}"</div>
        <div v-if="Object.keys(activeFilters).length > 0">Active filters: {{ Object.keys(activeFilters).length }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import TableControls from './TableControls.vue'
import TableFilters from './TableFilters.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TablePagination from './TablePagination.vue'
import useTable from './useTable'
import useFilters from './composables/useFilters'
import useColumns from './composables/useColumns'
import usePagination from './composables/usePagination'
import useSelection from './composables/useSelection'

const props = defineProps({
  // Data props
  data: { type: Array, required: true, default: () => [] },
  columns: { type: Array, required: true, default: () => [] },
  filters: { type: Array, default: () => [] },
  
  // Configuration props
  defaultSort: { type: Object, default: () => ({ key: 'id', order: 'asc' }) },
  storageKey: { type: String, default: 'global-table-config' },
  loading: { type: Boolean, default: false },
  
  // Feature flags
  enableRowSelection: { type: Boolean, default: false },
  enableExpandableRows: { type: Boolean, default: false },
  selectionMode: { 
    type: String, 
    default: 'multiple',
    validator: (value) => ['single', 'multiple', 'none'].includes(value)
  },
  
  // Display props
  pageSizeOptions: { type: Array, default: () => [10, 25, 50, 100] },
  showExport: { type: Boolean, default: true },
  showColumnSelectorProp: { type: Boolean, default: true },
  showFiltersProp: { type: Boolean, default: true },
  showPagination: { type: Boolean, default: true },
  
  // Performance
  virtualScroll: { type: Boolean, default: false },
  virtualScrollRowHeight: { type: Number, default: 48 },
  
  // Row identification
  rowKey: { type: String, default: 'id' },
  
  // Debug
  debug: { type: Boolean, default: false }
})

const emit = defineEmits([
  'row-click',
  'row-select',
  'bulk-action',
  'sort-change',
  'filter-change',
  'page-change',
  'export-data',
  'refresh'
])

// State for local UI controls
const showColumnSelector = ref(false)
const showFilters = ref(false)

// Use composables
const {
  sortBy,
  sortOrder,
  columnWidths,
  isResizing,
  resizeOverlayLeft,
  getNestedValue,
  formatValue,
  getRowKey,
  handleSort,
  startResize,
  autoResizeColumn,
  handleExport
} = useTable(props, emit)

const {
  searchQuery,
  activeFilters,
  availableFilters,
  activeFilterCount,
  hasActiveFilters,
  filteredData,
  getFilterComponent,
  updateFilter,
  applyFilters,
  clearAllFilters,
  clearSearch,
  clearAllFiltersAndSearch,
  handleSearch
} = useFilters(props, emit)

const {
  allColumns,
  visibleColumns,
  isColumnVisible,
  toggleColumnVisibility,
  resetColumns,
  canMoveLeft,
  canMoveRight,
  moveColumn
} = useColumns(props)

const {
  currentPage,
  pageSize,
  paginatedData,
  totalPages,
  startItem,
  endItem,
  visiblePages,
  previousPage,
  nextPage,
  goToPage,
  updatePageSize
} = usePagination(props, filteredData)

const {
  selectedRows,
  allRowsSelected,
  expandedRows,
  bulkAction,
  isRowSelected,
  toggleRowSelection,
  toggleSelectAll,
  handleRowClick,
  toggleRowExpansion,
  getRowById,
  performBulkAction
} = useSelection(props, emit, paginatedData)

// Local methods
const toggleColumnSelector = () => {
  showColumnSelector.value = !showColumnSelector.value
  // Close filters if opening column selector
  if (showColumnSelector.value) {
    showFilters.value = false
  }
}

const toggleFilters = () => {
  showFilters.value = !showFilters.value
  // Close column selector if opening filters
  if (showFilters.value) {
    showColumnSelector.value = false
  }
}

const updateSearch = (query) => {
  searchQuery.value = query
  handleSearch()
}

const handleRefresh = () => {
  emit('refresh')
}

// Watch for data changes to reset pagination
watch(() => props.data, () => {
  if (currentPage.value > 1) {
    currentPage.value = 1
  }
}, { deep: true })

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  const controls = document.querySelector('.table-controls')
  const filters = document.querySelector('.table-filters')
  
  if (showColumnSelector.value && controls && !controls.contains(event.target)) {
    showColumnSelector.value = false
  }
  
  if (showFilters.value && filters && !filters.contains(event.target)) {
    showFilters.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Expose methods if needed
defineExpose({
  refresh: handleRefresh,
  clearFilters: clearAllFilters,
  clearSelection: () => selectedRows.value = [],
  getSelectedRows: () => selectedRows.value,
  exportData: handleExport,
  filteredData: filteredData,
  searchQuery: searchQuery
})
</script>

<style scoped>
.global-table {
  position: relative;
}

/* Ensure proper z-index stacking */
.table-filters {
  z-index: 40;
}

/* Debug info */
.debug-info {
  font-size: 11px;
  padding: 4px 8px;
  background: #f3f4f6;
  border-top: 1px solid #e5e7eb;
}
</style>