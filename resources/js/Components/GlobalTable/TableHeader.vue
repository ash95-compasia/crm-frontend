<template>
  <thead>
    <tr>
      <th v-if="enableRowSelection" class="px-2 md:px-4 py-2 md:py-3.5 text-xs font-semibold text-gray-900 bg-gray-50 border-r border-gray-200 w-12 align-middle sticky top-0 z-10 bg-gray-50">
        <input
          type="checkbox"
          :checked="allRowsSelected"
          @change="$emit('toggle-select-all')"
          class="rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
      </th>
      <th 
        v-for="column in visibleColumns" 
        :key="column.key"
        :data-column="column.key"
        class="group px-2 md:px-4 py-2 md:py-3.5 text-xs font-semibold text-gray-900 uppercase tracking-wider bg-gray-50 cursor-move relative border-r border-gray-200 last:border-r-0 align-middle sticky top-0 z-10 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
        :class="[ 
          getHeaderAlignment(column),
          { 
            'cursor-pointer hover:bg-gray-100': column.sortable,
            'bg-green-50 text-green-700 border-r-green-200': sortBy === column.key,
            'bg-blue-50': resizingColumn === column.key
          }
        ]"
        :style="{ width: getColumnWidth(column.key) }"
        @click="column.sortable ? handleSort(column.key) : null"
        draggable="true"
        @dragstart="onDragStart($event, column.key)"
        @dragover.prevent
        @drop="onDrop($event, column.key)"
      >
        <div class="flex items-center w-full justify-between" :class="getHeaderContentAlignment(column)">
          <span class="truncate header-content">{{ column.label }}</span>
          <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
            <button
              v-if="column.sortable"
              class="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
              @click.stop="handleSort(column.key)"
            >
              <svg v-if="sortBy === column.key && sortOrder === 'asc'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
              <svg v-else-if="sortBy === column.key && sortOrder === 'desc'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
              </svg>
            </button>
            <button
              @click.stop="$emit('toggle-column-visibility', column.key)"
              class="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Resize Handle -->
        <div 
          class="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize bg-transparent hover:bg-green-300 transition-colors duration-200 z-10 group-hover:bg-green-200 hover:bg-green-400"
          @mousedown="$emit('start-resize', column.key, $event)"
          @dblclick="$emit('auto-resize-column', column.key)"
          title="Drag to resize or double-click to auto-fit"
        ></div>
      </th>
    </tr>
  </thead>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  visibleColumns: { type: Array, default: () => [] },
  sortBy: { type: String, default: '' },
  sortOrder: { type: String, default: 'asc' },
  enableRowSelection: { type: Boolean, default: false },
  allRowsSelected: { type: Boolean, default: false },
  columnWidths: { type: Object, default: () => ({}) }
})

const emit = defineEmits([
  'sort',
  'toggle-select-all',
  'toggle-column-visibility',
  'move-column',
  'start-resize',
  'auto-resize-column'
])

const resizingColumn = ref(null)

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

const getHeaderAlignment = (column) => {
  const alignment = getColumnAlignment(column)
  return `text-${alignment}`
}

const getHeaderContentAlignment = (column) => {
  const alignment = getColumnAlignment(column)
  if (alignment === 'left') return 'justify-start'
  if (alignment === 'center') return 'justify-center'
  if (alignment === 'right') return 'justify-end'
  return 'justify-start'
}

const handleSort = (key) => {
  emit('sort', key)
}

const onDragStart = (event, key) => {
  event.dataTransfer.setData('text/plain', key)
  event.dataTransfer.effectAllowed = 'move'
}

const onDrop = (event, targetKey) => {
  event.preventDefault()
  const draggedKey = event.dataTransfer.getData('text/plain')
  
  if (draggedKey && draggedKey !== targetKey) {
    // Find the indices
    const draggedIndex = props.visibleColumns.findIndex(col => col.key === draggedKey)
    const targetIndex = props.visibleColumns.findIndex(col => col.key === targetKey)
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      emit('move-column', draggedKey, targetIndex > draggedIndex ? 1 : -1)
    }
  }
}
</script>

<style scoped>
th {
  position: relative;
}

.resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  cursor: col-resize;
  opacity: 0;
  transition: opacity 0.2s;
}

.resize-handle:hover,
.resize-handle.active {
  opacity: 1;
  background-color: #3b82f6;
}

.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>