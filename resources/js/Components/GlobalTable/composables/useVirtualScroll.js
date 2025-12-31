import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export default function useVirtualScroll(data, containerRef, rowHeight = 48) {
  const visibleRows = ref([])
  const scrollTop = ref(0)
  const containerHeight = ref(0)
  const visibleCount = ref(0)
  const startIndex = ref(0)
  const endIndex = ref(0)
  const offsetTop = ref(0)

  // Calculate visible rows based on scroll position
  const calculateVisibleRows = () => {
    if (!containerRef.value || data.value.length === 0) {
      visibleRows.value = []
      return
    }

    // Calculate how many rows fit in the container
    const container = containerRef.value
    containerHeight.value = container.clientHeight
    visibleCount.value = Math.ceil(containerHeight.value / rowHeight) + 2 // Add buffer rows
    
    // Calculate start and end indices
    startIndex.value = Math.floor(scrollTop.value / rowHeight)
    endIndex.value = Math.min(startIndex.value + visibleCount.value, data.value.length)
    
    // Calculate offset for the transform
    offsetTop.value = startIndex.value * rowHeight
    
    // Update visible rows
    visibleRows.value = data.value.slice(startIndex.value, endIndex.value)
  }

  // Handle scroll events
  const handleVirtualScroll = (event) => {
    scrollTop.value = event.target.scrollTop
    calculateVisibleRows()
  }

  // Recalculate on window resize
  const handleResize = () => {
    calculateVisibleRows()
  }

  // Watch for data changes
  watch(data, () => {
    calculateVisibleRows()
  }, { immediate: true })

  // Set up resize observer
  let resizeObserver
  onMounted(() => {
    if (containerRef.value) {
      calculateVisibleRows()
      
      // Use ResizeObserver to detect container size changes
      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(containerRef.value)
      } else {
        // Fallback to window resize
        window.addEventListener('resize', handleResize)
      }
    }
  })

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    } else {
      window.removeEventListener('resize', handleResize)
    }
  })

  // Total height for the scroll container
  const totalHeight = computed(() => {
    return data.value.length * rowHeight
  })

  return {
    visibleRows,
    totalHeight,
    offsetTop,
    handleVirtualScroll,
    startIndex,
    endIndex,
    containerHeight
  }
}