import { ref, computed } from 'vue'

export default function useTable(props, emit) {
  // Sorting
  const sortBy = ref(props.defaultSort?.key || 'id')
  const sortOrder = ref(props.defaultSort?.order || 'asc')
  
  // Column Resizing
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
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.warn('Failed to load table configuration:', error)
      return null
    }
  }
  
  const savedConfig = loadSavedConfig()
  
  // Initialize column widths from saved config
  columnWidths.value = savedConfig?.columnWidths || {}
  
  // Save configuration
  const saveConfig = (key, value) => {
    try {
      const config = JSON.parse(localStorage.getItem(props.storageKey)) || {}
      config[key] = value
      localStorage.setItem(props.storageKey, JSON.stringify(config))
    } catch (error) {
      console.warn('Failed to save table configuration:', error)
    }
  }
  
  // Sorting function
  const sortData = (data) => {
    if (!sortBy.value || data.length === 0) return data
    
    return [...data].sort((a, b) => {
      const aVal = getNestedValue(a, sortBy.value)
      const bVal = getNestedValue(b, sortBy.value)
      
      // Handle null/undefined values
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      
      // Handle different types
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal
      }
      
      // Handle dates
      if (aVal instanceof Date || !isNaN(new Date(aVal).getTime())) {
        const dateA = new Date(aVal)
        const dateB = new Date(bVal)
        
        if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0
        if (isNaN(dateA.getTime())) return 1
        if (isNaN(dateB.getTime())) return -1
        
        return sortOrder.value === 'asc' 
          ? dateA - dateB 
          : dateB - dateA
      }
      
      // Handle strings
      const strA = String(aVal).toLowerCase()
      const strB = String(bVal).toLowerCase()
      
      return sortOrder.value === 'asc'
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA)
    })
  }
  
  // Row key getter
  const getRowKey = (row) => {
    if (props.rowKey.includes('.')) {
      return props.rowKey.split('.').reduce((obj, key) => obj?.[key], row)
    }
    return row[props.rowKey] || JSON.stringify(row)
  }
  
  // Sorting
  const handleSort = (key) => {
    if (sortBy.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = key
      sortOrder.value = 'asc'
    }
    
    saveConfig('sortBy', sortBy.value)
    saveConfig('sortOrder', sortOrder.value)
    
    emit('sort-change', { key: sortBy.value, order: sortOrder.value })
  }
  
  // Value formatting
  const getNestedValue = (obj, path) => {
    if (!path) return undefined
    return path.split('.').reduce((current, key) => {
      return current ? current[key] : undefined
    }, obj)
  }
  
  const formatValue = (value, column) => {
    if (value == null) return column.emptyValue || '-'
    
    if (column.format && typeof column.format === 'function') {
      return column.format(value)
    }
    
    if (column.type === 'select' && column.options) {
      const option = column.options.find(opt => String(opt.value) === String(value))
      return option ? option.label : value
    }
    
    if (column.type === 'date' && value) {
      const date = new Date(value)
      return isNaN(date.getTime()) 
        ? value 
        : date.toLocaleDateString()
    }
    
    if (column.type === 'currency' && typeof value === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: column.currency || 'USD',
        minimumFractionDigits: column.minFractionDigits || 2,
        maximumFractionDigits: column.maxFractionDigits || 2
      }).format(value)
    }
    
    if (column.type === 'number' && typeof value === 'number') {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: column.minFractionDigits || 0,
        maximumFractionDigits: column.maxFractionDigits || 2
      }).format(value)
    }
    
    if (column.type === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    
    return String(value)
  }
  
  // Column Resizing
  const startResize = (columnKey, event) => {
    isResizing.value = true
    resizingColumn.value = columnKey
    startX.value = event.pageX
    
    const th = event.target.closest('th')
    startWidth.value = th.offsetWidth
    
    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', stopResize)
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
    
    event.preventDefault()
  }
  
  const handleResize = (event) => {
    if (!isResizing.value) return
    
    const deltaX = event.pageX - startX.value
    const newWidth = Math.max(50, startWidth.value + deltaX)
    
    columnWidths.value[resizingColumn.value] = newWidth
    resizeOverlayLeft.value = event.pageX
  }
  
  const stopResize = () => {
    isResizing.value = false
    resizingColumn.value = null
    
    document.removeEventListener('mousemove', handleResize)
    document.removeEventListener('mouseup', stopResize)
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
    
    saveConfig('columnWidths', columnWidths.value)
  }
  
  const autoResizeColumn = (columnKey) => {
    // This would typically be implemented in the component
    // where we have DOM access
    console.log('Auto resize column:', columnKey)
  }
  
  // Export functionality
  const handleExport = (type = 'csv', selectedOnly = false) => {
    const data = selectedOnly 
      ? props.data.filter(row => selectedRows.value.includes(getRowKey(row)))
      : props.data
    
    emit('export-data', { type, data, selectedOnly })
    
    // Return promise for async operations
    return new Promise((resolve) => {
      // Implement export logic here
      console.log('Exporting data:', { type, count: data.length })
      resolve()
    })
  }
  
  return {
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
    handleExport,
    sortData
  }
}