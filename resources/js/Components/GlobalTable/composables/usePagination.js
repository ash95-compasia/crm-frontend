import { ref, computed, watch } from 'vue'

export default function usePagination(props, filteredData) {
  // Pagination state
  const currentPage = ref(1)
  const pageSize = ref(props.pageSizeOptions[0] || 10)
  
  // Total pages based on FILTERED data
  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredData.value.length / pageSize.value))
  })
  
  // Paginated data from FILTERED data
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredData.value.slice(start, end)
  })
  
  // Page indicators
  const startItem = computed(() => {
    return filteredData.value.length === 0 
      ? 0 
      : (currentPage.value - 1) * pageSize.value + 1
  })
  
  const endItem = computed(() => {
    return Math.min(currentPage.value * pageSize.value, filteredData.value.length)
  })
  
  // Visible pages
  const visiblePages = computed(() => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages.value <= maxVisible) {
      // Show all pages if total pages is less than maxVisible
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i)
      }
    } else {
      // Calculate start and end pages
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
      let end = Math.min(totalPages.value, start + maxVisible - 1)
      
      // Adjust if we're near the end
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('...')
        }
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add last page and ellipsis if needed
      if (end < totalPages.value) {
        if (end < totalPages.value - 1) {
          pages.push('...')
        }
        pages.push(totalPages.value)
      }
    }
    
    return pages
  })
  
  // Navigation methods
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
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }
  
  const updatePageSize = (size) => {
    pageSize.value = size
    currentPage.value = 1 // Reset to first page when page size changes
  }
  
  // Watch for filtered data changes to reset to page 1
  watch(() => filteredData.value.length, () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = Math.max(1, totalPages.value)
    }
  })
  
  // Also reset to page 1 when search or filters change
  watch(() => props.searchQuery, () => {
    currentPage.value = 1
  })
  
  return {
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
  }
}