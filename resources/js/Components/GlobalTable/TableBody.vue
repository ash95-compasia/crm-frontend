<template>
  <tbody>
    <template v-if="!isEmpty">
      <tr 
        v-for="(row, index) in paginatedData" 
        :key="getRowKey(row)"
        class="transition-all duration-200 border-b border-gray-100 hover:bg-gray-50"
        :class="{ 
          'bg-gray-50': index % 2 === 1,
          'bg-blue-50 border-blue-200': isRowSelected(row),
          'hover:bg-indigo-50': enableExpandableRows && row.expandable,
          'expandable': enableExpandableRows && row.expandable,
          'expanded': isRowExpanded(row)
        }"
        @click="handleRowClick(row, $event)"
      >
        <!-- Selection Checkbox -->
        <td v-if="enableRowSelection" class="px-2 md:px-4 py-2 md:py-4 w-12 border-r border-gray-100 align-middle">
          <input
            type="checkbox"
            :checked="isRowSelected(row)"
            @change.stop="$emit('row-select', row)"
            class="row-checkbox rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
          />
        </td>
        
        <!-- Data Cells -->
        <td 
          v-for="column in visibleColumns" 
          :key="column.key"
          class="px-2 md:px-4 py-2 md:py-4 text-sm text-gray-900 relative border-r border-gray-100 last:border-r-0 align-middle truncate"
          :class="getCellAlignment(column)"
          :style="{ width: getColumnWidth(column.key) }"
        >
          <slot 
            :name="`column-${column.key}`" 
            :value="getNestedValue(row, column.key)"
            :row="row"
            :column="column"
          >
            <div class="w-full overflow-hidden text-ellipsis whitespace-nowrap cell-content" :class="getCellContentAlignment(column)">
              <template v-if="column.type === 'select' && column.options">
                <select 
                  :value="getNestedValue(row, column.key)" 
                  disabled 
                  class="bg-transparent border-0 text-sm text-gray-900 cursor-default w-full text-left outline-none ring-0"
                >
                  <option v-for="option in column.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </template>
              <template v-else>
                {{ formatValue(getNestedValue(row, column.key), column) }}
              </template>
            </div>
          </slot>
        </td>
        
        <!-- Expand Button -->
        <td v-if="enableExpandableRows && row.expandable" class="px-2 md:px-4 py-2 md:py-4 w-12 border-r border-gray-100 text-center align-middle">
          <button @click.stop="$emit('row-expand', getRowKey(row))" class="p-1 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors">
            <svg v-if="!isRowExpanded(row)" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
            </svg>
          </button>
        </td>
      </tr>
      
      <!-- Expanded Row Content -->
      <tr v-for="rowId in expandedRows" :key="'expanded-' + rowId" class="bg-transparent border-none">
        <td :colspan="visibleColumns.length + (enableRowSelection ? 2 : 1)" class="p-0 border-none bg-gray-50">
          <slot :name="`expanded-${rowId}`" :row="getRowById(rowId)">
            <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg m-2">
              <p>Expanded content for row {{ rowId }}. Customize with scoped slot.</p>
            </div>
          </slot>
        </td>
      </tr>
    </template>
    
    <!-- Empty State -->
    <tr v-if="isEmpty">
      <td :colspan="visibleColumns.length + (enableRowSelection ? 1 : 0)" class="text-center p-12 bg-gray-50">
        <div class="flex flex-col items-center justify-center text-center">
          <svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No data found</h3>
          <p class="text-gray-500 mb-4">
            {{ hasActiveFilters ? 'Try adjusting your filters or search query' : 'No data available' }}
          </p>
          <button 
            v-if="hasActiveFilters" 
            @click="$emit('clear-filters-and-search')"
            class="px-4 py-2 text-sm text-green-600 hover:text-green-700 font-medium border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
const props = defineProps({
  paginatedData: { type: Array, default: () => [] },
  visibleColumns: { type: Array, default: () => [] },
  enableRowSelection: { type: Boolean, default: false },
  enableExpandableRows: { type: Boolean, default: false },
  selectedRows: { type: Array, default: () => [] },
  expandedRows: { type: Array, default: () => [] },
  isEmpty: { type: Boolean, default: false },
  hasActiveFilters: { type: Boolean, default: false },
  getNestedValue: { type: Function, required: true },
  formatValue: { type: Function, required: true },
  columnWidths: { type: Object, default: () => ({}) }
})

const emit = defineEmits([
  'row-click',
  'row-select',
  'row-expand',
  'clear-filters-and-search'
])

const getRowKey = (row) => {
  return row.id || JSON.stringify(row)
}

const isRowSelected = (row) => {
  const rowKey = getRowKey(row)
  return props.selectedRows.includes(rowKey)
}

const isRowExpanded = (row) => {
  const rowKey = getRowKey(row)
  return props.expandedRows.includes(rowKey)
}

const getRowById = (id) => {
  return props.paginatedData.find(row => getRowKey(row) === id)
}

const handleRowClick = (row, event) => {
  // Don't trigger if clicking on a button or link
  if (event.target.closest('button, a, input, select, .row-checkbox')) {
    return
  }
  emit('row-click', { row, event })
}

// FIXED: Use props.columnWidths instead of columnWidths directly
const getColumnWidth = (columnKey) => {
  const width = props.columnWidths[columnKey]
  return width ? `${width}px` : 'auto'
}

const getColumnAlignment = (column) => {
  if (column.align) {
    return column.align
  }
  
  if (column.type === 'currency' || column.type === 'number') {
    return 'right'
  }
  
  if (column.type === 'date' || column.type === 'boolean' || column.type === 'status') {
    return 'center'
  }
  
  return 'left'
}

const getCellAlignment = (column) => {
  const alignment = getColumnAlignment(column)
  return `text-${alignment}`
}

const getCellContentAlignment = (column) => {
  const alignment = getColumnAlignment(column)
  if (alignment === 'left') return 'text-left'
  if (alignment === 'center') return 'text-center'
  if (alignment === 'right') return 'text-right font-tabular'
  return 'text-left'
}
</script>

<style scoped>
tr {
  transition: all 0.2s ease;
}

td {
  vertical-align: middle;
}

.cell-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.expandable {
  cursor: pointer;
}

.expandable:hover {
  background-color: #f5f3ff;
}

.expanded {
  background-color: #f0f9ff;
}
</style>