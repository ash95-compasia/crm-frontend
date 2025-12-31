import { ref, computed } from 'vue'

export default function useSelection(props, emit, paginatedData) {
  // Selection state
  const selectedRows = ref([])
  const expandedRows = ref([])
  const bulkAction = ref('')
  
  // Check if all rows are selected
  const allRowsSelected = computed(() => {
    if (paginatedData.value.length === 0) return false
    return paginatedData.value.every(row => 
      selectedRows.value.includes(getRowKey(row))
    )
  })
  
  // Get row key
  const getRowKey = (row) => {
    if (props.rowKey.includes('.')) {
      return props.rowKey.split('.').reduce((obj, key) => obj?.[key], row)
    }
    return row[props.rowKey] || JSON.stringify(row)
  }
  
  // Check if row is selected
  const isRowSelected = (row) => {
    return selectedRows.value.includes(getRowKey(row))
  }
  
  // Toggle row selection
  const toggleRowSelection = (row) => {
    const rowKey = getRowKey(row)
    const index = selectedRows.value.indexOf(rowKey)
    
    if (props.selectionMode === 'single') {
      // For single selection, replace the selection
      selectedRows.value = index > -1 ? [] : [rowKey]
    } else {
      // For multiple selection, toggle the row
      if (index > -1) {
        selectedRows.value.splice(index, 1)
      } else {
        selectedRows.value.push(rowKey)
      }
    }
    
    emit('row-select', {
      selectedRows: selectedRows.value,
      row,
      selected: index === -1
    })
  }
  
  // Toggle select all rows on current page
  const toggleSelectAll = () => {
    if (allRowsSelected.value) {
      // Deselect all rows on current page
      const pageRowKeys = paginatedData.value.map(getRowKey)
      selectedRows.value = selectedRows.value.filter(key => 
        !pageRowKeys.includes(key)
      )
    } else {
      // Select all rows on current page
      const newSelections = paginatedData.value
        .map(getRowKey)
        .filter(key => !selectedRows.value.includes(key))
      selectedRows.value.push(...newSelections)
    }
    
    emit('row-select', {
      selectedRows: selectedRows.value,
      allSelected: allRowsSelected.value
    })
  }
  
  // Handle row click
  const handleRowClick = (row, event) => {
    // Don't trigger if clicking on a button or link
    if (event?.target?.closest('button, a, input, select')) {
      return
    }
    
    if (props.enableRowSelection && props.selectionMode !== 'none') {
      toggleRowSelection(row)
    }
    
    emit('row-click', { row, event })
  }
  
  // Toggle row expansion
  const toggleRowExpansion = (rowKey) => {
    const index = expandedRows.value.indexOf(rowKey)
    if (index > -1) {
      expandedRows.value.splice(index, 1)
    } else {
      expandedRows.value.push(rowKey)
    }
  }
  
  // Get row by ID
  const getRowById = (id) => {
    return props.data.find(row => getRowKey(row) === id)
  }
  
  // Perform bulk action
  const performBulkAction = () => {
    if (bulkAction.value && selectedRows.value.length > 0) {
      emit('bulk-action', {
        action: bulkAction.value,
        selectedRows: selectedRows.value,
        rows: selectedRows.value.map(getRowById).filter(Boolean)
      })
      
      // Reset bulk action
      bulkAction.value = ''
      
      // Optionally clear selection after bulk action
      if (props.clearSelectionAfterBulkAction) {
        selectedRows.value = []
      }
    }
  }
  
  // Clear all selections
  const clearSelection = () => {
    selectedRows.value = []
  }
  
  // Select all rows in entire dataset
  const selectAllData = () => {
    selectedRows.value = props.data.map(getRowKey)
    emit('row-select', {
      selectedRows: selectedRows.value,
      allSelected: true
    })
  }
  
  return {
    selectedRows,
    expandedRows,
    bulkAction,
    allRowsSelected,
    isRowSelected,
    toggleRowSelection,
    toggleSelectAll,
    handleRowClick,
    toggleRowExpansion,
    getRowById,
    performBulkAction,
    clearSelection,
    selectAllData
  }
}