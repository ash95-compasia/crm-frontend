import { ref, computed } from 'vue'

export default function useFilters(props, emit) {
  // Filter state
  const searchQuery = ref('')
  const activeFilters = ref({})
  const showAdvancedFilters = ref(false)
  
  // Load saved filters
  const loadSavedConfig = () => {
    try {
      const saved = localStorage.getItem(props.storageKey)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.warn('Failed to load table configuration:', error)
      return null
    }
  }
  
  const savedConfig = loadSavedConfig()
  activeFilters.value = savedConfig?.filters || {}
  
  // Available filters from props
  const availableFilters = computed(() => props.filters || [])
  
  // Filter count
  const activeFilterCount = computed(() => {
    return Object.values(activeFilters.value).filter(val => 
      val !== null && val !== undefined && val !== '' && 
      !(typeof val === 'object' && Object.keys(val).length === 0)
    ).length + (searchQuery.value ? 1 : 0)
  })
  
  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return activeFilterCount.value > 0
  })
  
  // ACTUAL FILTERING LOGIC - FIXED
  const filteredData = computed(() => {
    let result = [...props.data]
    
    // Apply search if exists
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter(row => {
        // Search across all visible columns
        return Object.entries(row).some(([key, value]) => {
          if (value == null) return false
          
          // Convert value to string for searching
          const stringValue = String(value).toLowerCase()
          return stringValue.includes(query)
        })
      })
    }
    
    // Apply filters if exists
    if (Object.keys(activeFilters.value).length > 0) {
      result = result.filter(row => {
        return Object.entries(activeFilters.value).every(([filterKey, filterValue]) => {
          if (filterValue == null || filterValue === '' || 
              (typeof filterValue === 'object' && Object.keys(filterValue).length === 0)) {
            return true
          }
          
          const cellValue = getNestedValue(row, filterKey)
          const filterDef = availableFilters.value.find(f => f.key === filterKey)
          
          if (!filterDef) return true
          
          // Apply filter based on type
          return applyFilter(cellValue, filterValue, filterDef.type)
        })
      })
    }
    
    return result
  })
  
  // Helper function to get nested values
  const getNestedValue = (obj, path) => {
    if (!path) return undefined
    return path.split('.').reduce((current, key) => {
      return current ? current[key] : undefined
    }, obj)
  }
  
  // Filter application logic
  const applyFilter = (cellValue, filterValue, filterType) => {
    const stringCellValue = String(cellValue || '').toLowerCase()
    const stringFilterValue = String(filterValue || '').toLowerCase()
    
    switch (filterType) {
      case 'range':
        return applyRangeFilter(cellValue, filterValue)
      case 'select':
        return applySelectFilter(cellValue, filterValue)
      case 'date':
        return applyDateFilter(cellValue, filterValue)
      case 'boolean':
        return applyBooleanFilter(cellValue, filterValue)
      case 'number':
        return applyNumberFilter(cellValue, filterValue)
      default: // text and others
        return stringCellValue.includes(stringFilterValue)
    }
  }
  
  // Get filter component type
  const getFilterComponent = (type) => {
    const components = {
      text: 'TextFilter',
      select: 'SelectFilter',
      date: 'DateFilter',
      number: 'NumberFilter',
      range: 'RangeFilter',
      multiSelect: 'MultiSelectFilter',
      boolean: 'BooleanFilter'
    }
    return components[type] || 'TextFilter'
  }
  
  // Update filter value
  const updateFilter = (key, value) => {
    activeFilters.value[key] = value
    saveFilters()
    // Emit to parent that filters changed
    emit('filter-change', { 
      key, 
      value, 
      activeFilters: activeFilters.value,
      searchQuery: searchQuery.value 
    })
  }
  
  // Apply filters
  const applyFilters = () => {
    emit('filter-change', { 
      activeFilters: activeFilters.value,
      searchQuery: searchQuery.value 
    })
  }
  
  // Clear all filters
  const clearAllFilters = () => {
    activeFilters.value = {}
    searchQuery.value = ''
    saveFilters()
    emit('filter-change', { 
      activeFilters: {}, 
      searchQuery: '' 
    })
  }
  
  // Clear search
  const clearSearch = () => {
    searchQuery.value = ''
    emit('filter-change', { 
      searchQuery: '',
      activeFilters: activeFilters.value
    })
  }
  
  // Clear all filters and search
  const clearAllFiltersAndSearch = () => {
    clearAllFilters()
  }
  
  // Handle search
  const handleSearch = () => {
    emit('filter-change', { 
      searchQuery: searchQuery.value,
      activeFilters: activeFilters.value
    })
  }
  
  // Save filters to localStorage
  const saveFilters = () => {
    try {
      const config = JSON.parse(localStorage.getItem(props.storageKey)) || {}
      config.filters = activeFilters.value
      config.searchQuery = searchQuery.value
      localStorage.setItem(props.storageKey, JSON.stringify(config))
    } catch (error) {
      console.warn('Failed to save filters:', error)
    }
  }
  
  // Filter logic helpers
  const applyRangeFilter = (value, filterValue) => {
    if (!filterValue || typeof filterValue !== 'object') return true
    
    const numValue = Number(value)
    if (isNaN(numValue)) return false
    
    const minValid = filterValue.min === undefined || numValue >= filterValue.min
    const maxValid = filterValue.max === undefined || numValue <= filterValue.max
    const exactValid = filterValue.exact === undefined || numValue === filterValue.exact
    
    return minValid && maxValid && exactValid
  }
  
  const applySelectFilter = (value, filterValue) => {
    if (!filterValue || filterValue === '') return true
    return String(value) === String(filterValue)
  }
  
  const applyNumberFilter = (value, filterValue) => {
    if (!filterValue || filterValue === '') return true
    
    const numValue = Number(value)
    const numFilterValue = Number(filterValue)
    
    if (isNaN(numValue) || isNaN(numFilterValue)) return false
    return numValue === numFilterValue
  }
  
  const applyBooleanFilter = (value, filterValue) => {
    if (filterValue === '' || filterValue === null || filterValue === undefined) return true
    return Boolean(value) === Boolean(filterValue)
  }
  
  const applyDateFilter = (value, filterValue) => {
    if (!filterValue) return true
    
    const dateValue = new Date(value)
    if (isNaN(dateValue.getTime())) return false
    
    if (typeof filterValue === 'object') {
      if (filterValue.start && filterValue.end) {
        const startDate = new Date(filterValue.start)
        const endDate = new Date(filterValue.end)
        return dateValue >= startDate && dateValue <= endDate
      } else if (filterValue.exact) {
        const exactDate = new Date(filterValue.exact)
        return dateValue.toDateString() === exactDate.toDateString()
      }
    } else if (typeof filterValue === 'string') {
      const filterDate = new Date(filterValue)
      return dateValue.toDateString() === filterDate.toDateString()
    }
    
    return true
  }
  
  return {
    searchQuery,
    activeFilters,
    availableFilters,
    activeFilterCount,
    hasActiveFilters,
    filteredData,
    showAdvancedFilters,
    getFilterComponent,
    updateFilter,
    applyFilters,
    clearAllFilters,
    clearSearch,
    clearAllFiltersAndSearch,
    handleSearch,
    // Filter logic helpers
    applyRangeFilter,
    applySelectFilter,
    applyNumberFilter,
    applyBooleanFilter,
    applyDateFilter,
    getNestedValue
  }
}