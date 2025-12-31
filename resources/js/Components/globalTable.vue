<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden transition-colors duration-300">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center p-8 text-center">
      <div class="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Loading data...</p>
    </div>

    <!-- Table Controls -->
    <div v-else class="flex flex-col md:flex-row flex-wrap items-center gap-3 md:gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
      <!-- Row Selection Controls -->
      <div class="relative flex items-center" v-if="enableRowSelection">
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            :checked="allRowsSelected"
            @change="toggleSelectAll"
            class="rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800"
          />
          <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Select All</span>
        </label>
        <span v-if="selectedRows.length > 0" class="bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-xs ml-2 text-blue-700 dark:text-blue-400">
          {{ selectedRows.length }} selected
        </span>
      </div>

      <!-- Column Visibility Controls -->
      <div class="relative flex items-center">
        <button
          @click="showColumnSelector = !showColumnSelector"
          class="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm"
          :class="{ 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 shadow-md': showColumnSelector }"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 22V12h6v10"></path>
          </svg>
          Columns
        </button>

        <!-- Column Selector Dropdown -->
        <div v-if="showColumnSelector" class="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-[9999]">
          <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-t-lg">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Show/Hide Columns</h3>
            <button @click="resetColumns" class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Reset All
            </button>
          </div>
          <div class="max-h-64 overflow-y-auto">
            <div
              v-for="column in allColumns"
              :key="column.key"
              class="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              :class="{ 'opacity-50': !isColumnVisible(column.key) }"
            >
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  :checked="isColumnVisible(column.key)"
                  @change="toggleColumnVisibility(column.key)"
                  class="rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ column.label }}</span>
              </label>
              <div class="flex space-x-1">
                <button
                  @click="moveColumn(column.key, -1)"
                  :disabled="!canMoveLeft(column.key)"
                  class="w-6 h-6 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-300"
                >
                  ←
                </button>
                <button
                  @click="moveColumn(column.key, 1)"
                  :disabled="!canMoveRight(column.key)"
                  class="w-6 h-6 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-300"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Controls -->
      <div class="relative flex items-center">
        <button
          @click="showFilters = !showFilters"
          class="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm"
          :class="{ 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 shadow-md': showFilters }"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
          </svg>
          Filters
          <span v-if="activeFilterCount > 0" class="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full font-medium">
            {{ activeFilterCount }}
          </span>
        </button>

        <!-- Filter Panel -->
        <div v-if="showFilters" class="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-[9999]">
          <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-t-lg">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Filters</h3>
            <div class="space-x-4">
              <button @click="clearAllFilters" class="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Clear All
              </button>
              <button @click="applyFilters" class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                Apply
              </button>
            </div>
          </div>
          <div class="p-3 space-y-3">
            <div
              v-for="filter in availableFilters"
              :key="filter.key"
              class="space-y-1"
            >
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wide">{{ filter.label }}</label>
              <component
                :is="getFilterComponent(filter.type)"
                :filter="filter"
                :value="filters[filter.key]"
                @update="updateFilter(filter.key, $event)"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="relative flex items-center flex-1 w-full md:flex-none md:max-w-md">
        <div class="relative flex items-center w-full">
          <svg class="absolute left-3 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search across all columns..."
            class="w-full pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
            @input="onSearch"
          />
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-2 w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Bulk Actions -->
      <div class="relative flex items-center" v-if="enableRowSelection && selectedRows.length > 0">
        <select v-model="bulkAction" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300" @change="performBulkAction">
          <option value="">Actions</option>
          <option value="delete">Delete Selected</option>
          <option value="export">Export Selected</option>
        </select>
      </div>

      <!-- Export -->
      <div class="relative flex items-center">
        <button @click="exportData" class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Export
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto max-h-96 overflow-y-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th v-if="enableRowSelection" class="px-2 md:px-4 py-2 md:py-3.5 text-xs font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-12 align-middle sticky top-0 z-10">
              <input
                type="checkbox"
                :checked="allRowsSelected"
                @change="toggleSelectAll"
                class="rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
              />
            </th>
            <th 
              v-for="column in visibleColumns" 
              :key="column.key"
              :data-column="column.key"
              class="group px-2 md:px-4 py-2 md:py-3.5 text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider bg-gray-50 dark:bg-gray-800 cursor-move relative border-r border-gray-200 dark:border-gray-700 last:border-r-0 align-middle sticky top-0 z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
              :class="[ 
                getHeaderAlignment(column),
                { 
                  'cursor-pointer': column.sortable,
                  'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-r-blue-200 dark:border-r-blue-700': sortBy === column.key,
                  'bg-blue-50 dark:bg-blue-900/30': resizingColumn === column.key
                }
              ]"
              :style="{ width: getColumnWidth(column.key) }"
              @click="column.sortable ? sortTable(column.key) : null"
              draggable="true"
              @dragstart="onDragStart($event, column.key)"
              @dragover="onDragOver"
              @drop="onDrop($event, column.key)"
            >
              <div class="flex items-center w-full justify-between" :class="getHeaderContentAlignment(column)">
                <span class="truncate">{{ column.label }}</span>
                <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
                  <button
                    v-if="column.sortable"
                    class="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 rounded transition-colors"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                    </svg>
                  </button>
                  <button
                    @click="toggleColumnVisibility(column.key)"
                    class="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 rounded transition-colors"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Resize Handle -->
              <div 
                class="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize bg-transparent hover:bg-blue-300 dark:hover:bg-blue-500 transition-colors duration-200 z-10 group-hover:bg-blue-200 dark:group-hover:bg-blue-600"
                @mousedown="startResize(column.key, $event)"
                @dblclick="autoResizeColumn(column.key)"
                title="Drag to resize or double-click to auto-fit"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800">
          <tr 
            v-for="(row, index) in paginatedData" 
            :key="row.id || index"
            class="transition-all duration-200 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            :class="{ 
              'bg-gray-50 dark:bg-gray-900/50': index % 2 === 1,
              'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700': isRowSelected(row),
              'hover:bg-blue-50 dark:hover:bg-blue-900/30': enableExpandableRows && row.expandable,
              'expandable': enableExpandableRows && row.expandable,
              'expanded': expandedRows.includes(row.id)
            }"
            @click="handleRowClick(row)"
          >
            <td v-if="enableRowSelection" class="px-2 md:px-4 py-2 md:py-4 w-12 border-r border-gray-100 dark:border-gray-700 align-middle" style="overflow: hidden; text-overflow: ellipsis; vertical-align: middle;">
              <input
                type="checkbox"
                :checked="isRowSelected(row)"
                @change="toggleRowSelection(row)"
                class="row-checkbox rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 cursor-pointer"
              />
            </td>
            <td 
              v-for="column in visibleColumns" 
              :key="column.key"
              class="px-2 md:px-4 py-2 md:py-4 text-sm text-gray-900 dark:text-gray-300 relative border-r border-gray-100 dark:border-gray-700 last:border-r-0 align-middle truncate"
              :class="getCellAlignment(column)"
              :style="{ width: getColumnWidth(column.key), overflow: 'hidden', textOverflow: 'ellipsis', verticalAlign: 'middle' }"
            >
              <slot 
                :name="`column-${column.key}`" 
                :value="getNestedValue(row, column.key)"
                :row="row"
                :column="column"
              >
                <div class="w-full overflow-hidden text-ellipsis whitespace-nowrap" :class="getCellContentAlignment(column)">
                  <template v-if="column.type === 'select' && column.options">
                    <select 
                      :value="getNestedValue(row, column.key)" 
                      disabled 
                      class="bg-transparent border-0 text-sm text-gray-900 dark:text-gray-300 cursor-default w-full text-left outline-none ring-0"
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
            <td v-if="enableExpandableRows && row.expandable" class="px-2 md:px-4 py-2 md:py-4 w-12 border-r border-gray-100 dark:border-gray-700 text-center align-middle">
              <button @click.stop="toggleRowExpansion(row.id)" class="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                <svg v-if="!expandedRows.includes(row.id)" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <td :colspan="visibleColumns.length + (enableRowSelection ? 2 : 1)" class="p-0 border-none bg-gray-50 dark:bg-gray-900/50" style="overflow: hidden; text-overflow: ellipsis; vertical-align: middle;">
              <slot :name="`expanded-${rowId}`" :row="getRowById(rowId)">
                <div class="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <p class="text-gray-700 dark:text-gray-400">Expanded content for row {{ rowId }}. Customize with scoped slot.</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredData.length === 0 && !loading" class="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-gray-900/50">
        <svg class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No data found</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          {{ hasActiveFilters ? 'Try adjusting your filters or search query' : 'No data available' }}
        </p>
        <button 
          v-if="hasActiveFilters" 
          @click="clearAllFiltersAndSearch"
          class="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    </div>

    <!-- Resize Overlay -->
    <div 
      v-if="isResizing" 
      class="absolute top-0 bottom-0 w-0.5 bg-blue-500 dark:bg-blue-400 pointer-events-none z-20 shadow-lg"
      :style="{ left: resizeOverlayLeft + 'px' }"
    ></div>

    <!-- Pagination -->
    <div v-if="filteredData.length > 0 && !loading" class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
      <div class="text-sm text-gray-700 dark:text-gray-300 font-medium">
        Showing {{ startItem }}-{{ endItem }} of {{ filteredData.length }} items
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
        >
          Previous
        </button>
        <div class="flex items-center space-x-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="w-10 h-10 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
            :class="{ 'bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700 shadow-md': page === currentPage }"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
        >
          Next
        </button>
      </div>
      <div>
        <select v-model="pageSize" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300">
          <option :value="10">10 per page</option>
          <option :value="25">25 per page</option>
          <option :value="50">50 per page</option>
          <option :value="100">100 per page</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// Filter Components (Updated with dark mode)
const TextFilter = {
  props: ['filter', 'value'],
  template: `
    <input
      type="text"
      :value="value"
      @input="$emit('update', $event.target.value)"
      :placeholder="filter.placeholder || 'Filter...'"
      class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
    />
  `
}

const SelectFilter = {
  props: ['filter', 'value'],
  template: `
    <select
      :value="value"
      @change="$emit('update', $event.target.value)"
      class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
    >
      <option value="">All</option>
      <option
        v-for="option in filter.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  `
}

const DateFilter = {
  props: ['filter', 'value'],
  template: `
    <input
      type="date"
      :value="value"
      @input="$emit('update', $event.target.value)"
      class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
    />
  `
}

const NumberFilter = {
  props: ['filter', 'value'],
  template: `
    <input
      type="number"
      :value="value"
      @input="$emit('update', $event.target.value)"
      :placeholder="filter.placeholder || 'Enter number...'"
      class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
    />
  `
}

export default {
  name: 'globalTable',
  components: {
    TextFilter,
    SelectFilter,
    DateFilter,
    NumberFilter
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    },
    defaultSort: {
      type: Object,
      default: () => ({ key: 'id', order: 'asc' })
    },
    storageKey: {
      type: String,
      default: 'global-table-config'
    },
    loading: {
      type: Boolean,
      default: false
    },
    enableRowSelection: {
      type: Boolean,
      default: false
    },
    enableExpandableRows: {
      type: Boolean,
      default: false
    }
  },
  emits: ['row-click', 'row-select', 'bulk-action'],
  setup(props, { emit }) {
    // Reactive state
    const showColumnSelector = ref(false)
    const showFilters = ref(false)
    const searchQuery = ref('')
    const sortBy = ref(props.defaultSort.key)
    const sortOrder = ref(props.defaultSort.order)
    const currentPage = ref(1)
    const pageSize = ref(10)
    const draggedColumn = ref(null)
    const selectedRows = ref([])
    const expandedRows = ref([])
    const bulkAction = ref('')

    // Column resizing state
    const isResizing = ref(false)
    const resizingColumn = ref(null)
    const startX = ref(0)
    const startWidth = ref(0)
    const resizeOverlayLeft = ref(0)
    const columnWidths = ref({})

    // Load saved configuration
    const loadSavedConfig = () => {
      try {
        const saved = localStorage.getItem(props.storageKey)
        if (saved) {
          const config = JSON.parse(saved)
          return config
        }
      } catch (error) {
        console.warn('Failed to load table configuration:', error)
      }
      return null
    }

    const savedConfig = loadSavedConfig()

    // Column visibility and order
    const columnVisibility = ref(
      savedConfig?.columnVisibility || 
      props.columns.reduce((acc, col) => {
        acc[col.key] = col.hidden !== true
        return acc
      }, {})
    )

    const columnOrder = ref(
      savedConfig?.columnOrder || 
      props.columns.map(col => col.key)
    )

    // Column widths
    columnWidths.value = savedConfig?.columnWidths || {}

    // Filters state
    const activeFilters = ref(savedConfig?.filters || {})

    // Save configuration
    const saveConfig = () => {
      try {
        const config = {
          columnVisibility: columnVisibility.value,
          columnOrder: columnOrder.value,
          columnWidths: columnWidths.value,
          filters: activeFilters.value
        }
        localStorage.setItem(props.storageKey, JSON.stringify(config))
      } catch (error) {
        console.warn('Failed to save table configuration:', error)
      }
    }

    // Computed properties
    const allColumns = computed(() => props.columns)

    const visibleColumns = computed(() => {
      return columnOrder.value
        .filter(key => columnVisibility.value[key])
        .map(key => props.columns.find(col => col.key === key))
        .filter(Boolean)
    })

    const availableFilters = computed(() => props.filters)

    const activeFilterCount = computed(() => {
      return Object.values(activeFilters.value).filter(val => 
        val !== null && val !== undefined && val !== ''
      ).length
    })

    const hasActiveFilters = computed(() => {
      return activeFilterCount.value > 0 || searchQuery.value !== ''
    })

    const allRowsSelected = computed(() => {
      return props.data.length > 0 && selectedRows.value.length === props.data.length
    })

    // Ensure effective page size is always a number
    const effectivePageSize = computed(() => Number(pageSize.value) || 10)

    // Filter and sort data
    const filteredData = computed(() => {
      let result = [...props.data]

      // Apply search
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(row => {
          return Object.values(row).some(value => 
            String(value).toLowerCase().includes(query)
          )
        })
      }

      // Apply filters
      if (hasActiveFilters.value) {
        result = result.filter(row => {
          return Object.entries(activeFilters.value).every(([key, value]) => {
            if (!value || value === '') return true
            
            const cellValue = getNestedValue(row, key)
            return String(cellValue).toLowerCase().includes(String(value).toLowerCase())
          })
        })
      }

      // Apply sorting
      if (sortBy.value && sortBy.value != 'transaction_date' ) {
        result.sort((a, b) => {
          const aVal = getNestedValue(a, sortBy.value)
          const bVal = getNestedValue(b, sortBy.value)
          
          if (aVal === bVal) return 0
          if (aVal == null) return 1
          if (bVal == null) return -1
          
          const comparison = aVal < bVal ? -1 : 1
          return sortOrder.value === 'asc' ? comparison : -comparison
        })
      }
      return result
    })

    // Pagination
    const totalPages = computed(() => 
      Math.ceil(filteredData.value.length / effectivePageSize.value)
    )

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * effectivePageSize.value
      const end = start + effectivePageSize.value
      return filteredData.value.slice(start, end)
    })

    const startItem = computed(() => 
      filteredData.value.length === 0 ? 0 : (currentPage.value - 1) * effectivePageSize.value + 1
    )

    const endItem = computed(() => 
      Math.min(currentPage.value * effectivePageSize.value, filteredData.value.length)
    )

    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    })

    // Methods for row selection and expansion
    const isRowSelected = (row) => {
      return selectedRows.value.includes(row.id || row)
    }

    const toggleRowSelection = (row) => {
      const id = row.id || row
      const index = selectedRows.value.indexOf(id)
      if (index > -1) {
        selectedRows.value.splice(index, 1)
      } else {
        selectedRows.value.push(id)
      }
      emit('row-select', selectedRows.value)
    }

    const toggleSelectAll = () => {
      if (allRowsSelected.value) {
        selectedRows.value = []
      } else {
        selectedRows.value = props.data.map(row => row.id || row)
      }
      emit('row-select', selectedRows.value)
    }

    const handleRowClick = (row) => {
      if (props.enableRowSelection) {
        toggleRowSelection(row)
      }
      emit('row-click', row)
    }

    const toggleRowExpansion = (rowId) => {
      const index = expandedRows.value.indexOf(rowId)
      if (index > -1) {
        expandedRows.value.splice(index, 1)
      } else {
        expandedRows.value.push(rowId)
      }
    }

    const getRowById = (id) => {
      return props.data.find(row => (row.id || row) === id)
    }

    const performBulkAction = () => {
      if (bulkAction.value) {
        emit('bulk-action', bulkAction.value, selectedRows.value)
        bulkAction.value = ''
      }
    }

    const exportData = () => {
      // Implement export logic here
      console.log('Exporting data:', filteredData.value)
      alert('Export functionality stub - implement CSV/Excel export.')
    }

    // Column width methods
    const getColumnWidth = (columnKey) => {
      const width = columnWidths.value[columnKey];
      return width ? `${width}px` : 'auto';
    }

    const startResize = (columnKey, event) => {
      isResizing.value = true
      resizingColumn.value = columnKey
      startX.value = event.pageX
      
      const th = event.target.closest('th')
      startWidth.value = th.offsetWidth
      
      // Add event listeners
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', stopResize)
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'
      
      event.preventDefault()
    }

    const handleResize = (event) => {
      if (!isResizing.value) return
      
      const deltaX = event.pageX - startX.value
      const newWidth = Math.max(50, startWidth.value + deltaX) // Minimum width 50px
      
      columnWidths.value[resizingColumn.value] = newWidth
      resizeOverlayLeft.value = event.pageX
    }

    const stopResize = () => {
      isResizing.value = false
      resizingColumn.value = null
      
      // Remove event listeners
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      
      saveConfig()
    }

    const autoResizeColumn = (columnKey) => {
      // Find the maximum content width for this column
      let maxWidth = 120 // Minimum width
      
      // Calculate header width
      const headerElement = document.querySelector(`th[data-column="${columnKey}"] .header-content`)
      if (headerElement) {
        maxWidth = Math.max(maxWidth, headerElement.scrollWidth)
      }
      
      // Calculate content width for visible rows
      const contentElements = document.querySelectorAll(`td[data-column="${columnKey}"] .cell-content`)
      contentElements.forEach(element => {
        maxWidth = Math.max(maxWidth, element.scrollWidth)
      })
      
      // Add some padding
      maxWidth += 32
      
      columnWidths.value[columnKey] = maxWidth
      saveConfig()
    }

    const resetColumnWidths = () => {
      columnWidths.value = {}
      saveConfig()
    }

    // Alignment methods
    const getColumnAlignment = (column) => {
      // Use explicit alignment if provided
      if (column.align) {
        return column.align
      }
      
      // Auto-detect based on column type
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

    // Column visibility methods
    const isColumnVisible = (key) => columnVisibility.value[key]

    const toggleColumnVisibility = (key) => {
      columnVisibility.value[key] = !columnVisibility.value[key]
      saveConfig()
    }

    const resetColumns = () => {
      columnVisibility.value = props.columns.reduce((acc, col) => {
        acc[col.key] = col.hidden !== true
        return acc
      }, {})
      columnOrder.value = props.columns.map(col => col.key)
      resetColumnWidths()
      saveConfig()
    }

    const canMoveLeft = (key) => {
      const visibleKeys = columnOrder.value.filter(k => columnVisibility.value[k])
      const index = visibleKeys.indexOf(key)
      return index > 0
    }

    const canMoveRight = (key) => {
      const visibleKeys = columnOrder.value.filter(k => columnVisibility.value[k])
      const index = visibleKeys.indexOf(key)
      return index < visibleKeys.length - 1 && index !== -1
    }

    const moveColumn = (key, direction) => {
      const currentIndex = columnOrder.value.indexOf(key)
      const newIndex = currentIndex + direction
      
      if (newIndex >= 0 && newIndex < columnOrder.value.length) {
        const newOrder = [...columnOrder.value]
        ;[newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]]
        columnOrder.value = newOrder
        saveConfig()
      }
    }

    const onDragStart = (event, key) => {
      draggedColumn.value = key
      event.dataTransfer.effectAllowed = 'move'
    }

    const onDragOver = (event) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    }

    const onDrop = (event, targetKey) => {
      event.preventDefault()
      if (draggedColumn.value && draggedColumn.value !== targetKey) {
        const draggedIndex = columnOrder.value.indexOf(draggedColumn.value)
        const targetIndex = columnOrder.value.indexOf(targetKey)
        
        const newOrder = [...columnOrder.value]
        newOrder.splice(draggedIndex, 1)
        newOrder.splice(targetIndex, 0, draggedColumn.value)
        
        columnOrder.value = newOrder
        saveConfig()
      }
      draggedColumn.value = null
    }

    const getFilterComponent = (type) => {
      const components = {
        text: 'TextFilter',
        select: 'SelectFilter',
        date: 'DateFilter',
        number: 'NumberFilter'
      }
      return components[type] || 'TextFilter'
    }

    const updateFilter = (key, value) => {
      activeFilters.value[key] = value
      saveConfig()
    }

    const applyFilters = () => {
      currentPage.value = 1
      showFilters.value = false
    }

    const clearAllFilters = () => {
      activeFilters.value = {}
      saveConfig()
    }

    const clearSearch = () => {
      searchQuery.value = ''
      currentPage.value = 1
    }

    const clearAllFiltersAndSearch = () => {
      clearAllFilters()
      clearSearch()
    }

    const onSearch = () => {
      currentPage.value = 1
    }

    const sortTable = (key) => {
      if (sortBy.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortBy.value = key
        sortOrder.value = 'asc'
      }
      currentPage.value = 1
    }

    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((current, key) => {
        return current ? current[key] : undefined
      }, obj)
    }

    const formatValue = (value, column) => {
      if (value == null) return '-'
      
      if (column.format) {
        return column.format(value)
      }
      
      if (column.type === 'select' && column.options) {
        const option = column.options.find(opt => opt.value == value)
        return option ? option.label : value
      }
      
      if (column.type === 'date' && value) {
        const date = new Date(value)
        return isNaN(date.getTime()) ? value : date.toLocaleDateString()
      }
      
      if (column.type === 'currency' && typeof value === 'number') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value)
      }
      
      if (column.type === 'number' && typeof value === 'number') {
        return new Intl.NumberFormat('en-US').format(value)
      }
      
      return String(value)
    }

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const goToPage = (page) => {
      currentPage.value = page
    }

    // Cleanup event listeners on unmount
    onUnmounted(() => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
    })

    // Watchers
    watch(pageSize, () => {
      currentPage.value = 1
    })

    return {
      showColumnSelector,
      showFilters,
      searchQuery,
      sortBy,
      sortOrder,
      currentPage,
      pageSize,
      allColumns,
      visibleColumns,
      availableFilters,
      activeFilters,
      activeFilterCount,
      hasActiveFilters,
      filteredData,
      paginatedData,
      totalPages,
      startItem,
      endItem,
      visiblePages,
      isResizing,
      resizingColumn,
      resizeOverlayLeft,
      getColumnWidth,
      startResize,
      autoResizeColumn,
      getHeaderAlignment,
      getHeaderContentAlignment,
      getCellAlignment,
      getCellContentAlignment,
      isColumnVisible,
      toggleColumnVisibility,
      resetColumns,
      canMoveLeft,
      canMoveRight,
      moveColumn,
      onDragStart,
      onDragOver,
      onDrop,
      getFilterComponent,
      updateFilter,
      applyFilters,
      clearAllFilters,
      clearSearch,
      clearAllFiltersAndSearch,
      onSearch,
      sortTable,
      getNestedValue,
      formatValue,
      previousPage,
      nextPage,
      goToPage,
      filters: activeFilters,
      // New returns
      allRowsSelected,
      selectedRows,
      isRowSelected,
      toggleRowSelection,
      toggleSelectAll,
      handleRowClick,
      expandedRows,
      toggleRowExpansion,
      getRowById,
      bulkAction,
      performBulkAction,
      exportData
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for dark mode */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.dark ::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Improve table row hover effects */
tbody tr {
  transition: background-color 0.15s ease-in-out;
}

/* Ensure proper text truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Tabular numbers for right-aligned content */
.font-tabular {
  font-variant-numeric: tabular-nums;
}
</style>