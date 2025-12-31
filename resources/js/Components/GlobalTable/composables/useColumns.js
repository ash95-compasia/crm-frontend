import { ref, computed } from 'vue'

export default function useColumns(props) {
  // Column state
  const columnVisibility = ref({})
  const columnOrder = ref([])
  
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
  
  // Initialize columns
  const initializeColumns = () => {
    const defaultVisibility = props.columns.reduce((acc, col) => {
      acc[col.key] = col.hidden !== true
      return acc
    }, {})
    
    const defaultOrder = props.columns.map(col => col.key)
    
    columnVisibility.value = savedConfig?.columnVisibility || defaultVisibility
    columnOrder.value = savedConfig?.columnOrder || defaultOrder
  }
  
  initializeColumns()
  
  // All columns
  const allColumns = computed(() => props.columns)
  
  // Visible columns
  const visibleColumns = computed(() => {
    return columnOrder.value
      .filter(key => columnVisibility.value[key])
      .map(key => props.columns.find(col => col.key === key))
      .filter(Boolean)
  })
  
  // Check if column is visible
  const isColumnVisible = (key) => {
    return columnVisibility.value[key] === true
  }
  
  // Toggle column visibility
  const toggleColumnVisibility = (key) => {
    columnVisibility.value[key] = !columnVisibility.value[key]
    saveColumnConfig()
  }
  
  // Reset all columns to default
  const resetColumns = () => {
    initializeColumns()
    saveColumnConfig()
  }
  
  // Check if column can move left
  const canMoveLeft = (key) => {
    const visibleKeys = columnOrder.value.filter(k => columnVisibility.value[k])
    const index = visibleKeys.indexOf(key)
    return index > 0
  }
  
  // Check if column can move right
  const canMoveRight = (key) => {
    const visibleKeys = columnOrder.value.filter(k => columnVisibility.value[k])
    const index = visibleKeys.indexOf(key)
    return index < visibleKeys.length - 1 && index !== -1
  }
  
  // Move column
  const moveColumn = (key, direction) => {
    const currentIndex = columnOrder.value.indexOf(key)
    const newIndex = currentIndex + direction
    
    if (newIndex >= 0 && newIndex < columnOrder.value.length) {
      const newOrder = [...columnOrder.value]
      ;[newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]]
      columnOrder.value = newOrder
      saveColumnConfig()
    }
  }
  
  // Drag and drop
  const onDragStart = (event, key) => {
    event.dataTransfer.setData('text/plain', key)
    event.dataTransfer.effectAllowed = 'move'
  }
  
  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }
  
  const onDrop = (event, targetKey) => {
    event.preventDefault()
    const draggedKey = event.dataTransfer.getData('text/plain')
    
    if (draggedKey && draggedKey !== targetKey) {
      const draggedIndex = columnOrder.value.indexOf(draggedKey)
      const targetIndex = columnOrder.value.indexOf(targetKey)
      
      const newOrder = [...columnOrder.value]
      newOrder.splice(draggedIndex, 1)
      newOrder.splice(targetIndex, 0, draggedKey)
      
      columnOrder.value = newOrder
      saveColumnConfig()
    }
  }
  
  // Save column configuration
  const saveColumnConfig = () => {
    try {
      const config = JSON.parse(localStorage.getItem(props.storageKey)) || {}
      config.columnVisibility = columnVisibility.value
      config.columnOrder = columnOrder.value
      localStorage.setItem(props.storageKey, JSON.stringify(config))
    } catch (error) {
      console.warn('Failed to save column configuration:', error)
    }
  }
  
  return {
    allColumns,
    visibleColumns,
    columnVisibility,
    columnOrder,
    isColumnVisible,
    toggleColumnVisibility,
    resetColumns,
    canMoveLeft,
    canMoveRight,
    moveColumn,
    onDragStart,
    onDragOver,
    onDrop
  }
}