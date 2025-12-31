<template>
  <div v-if="showPagination" class="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
    <!-- Pagination Info -->
    <div class="text-sm text-gray-700 font-medium">
      Showing <span class="font-semibold">{{ startItem }}</span>-<span class="font-semibold">{{ endItem }}</span> 
      of <span class="font-semibold">{{ totalItems }}</span> items
    </div>
    
    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <button
        @click="$emit('previous-page')"
        :disabled="currentPage === 1"
        class="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Previous
      </button>
      
      <!-- Page Numbers -->
      <div class="flex items-center space-x-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="handlePageClick(page)"
          class="w-10 h-10 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          :class="{
            'bg-green-600 text-white border-green-600 shadow-md hover:bg-green-700': page === currentPage,
            'cursor-default': page === '...'
          }"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
      </div>
      
      <button
        @click="$emit('next-page')"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center"
      >
        Next
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
    
    <!-- Page Size Selector -->
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600">Show</span>
      <select 
        :value="pageSize" 
        @change="handlePageSizeChange"
        class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      >
        <option v-for="option in pageSizeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <span class="text-sm text-gray-600">per page</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  totalItems: { type: Number, default: 0 },
  startItem: { type: Number, default: 0 },
  endItem: { type: Number, default: 0 },
  visiblePages: { type: Array, default: () => [] },
  totalPages: { type: Number, default: 0 },
  pageSizeOptions: { type: Array, default: () => [10, 25, 50, 100] },
  showPagination: { type: Boolean, default: true }
})

const emit = defineEmits([
  'previous-page',
  'next-page',
  'go-to-page',
  'update-page-size'
])

const handlePageClick = (page) => {
  if (page !== '...' && page !== props.currentPage) {
    emit('go-to-page', page)
  }
}

const handlePageSizeChange = (event) => {
  const newSize = parseInt(event.target.value, 10)
  emit('update-page-size', newSize)
}
</script>

<style scoped>
.pagination-container {
  user-select: none;
}

button:disabled {
  cursor: not-allowed;
}

/* Smooth transitions for pagination buttons */
button:not(:disabled) {
  transition: all 0.2s ease;
}
</style>