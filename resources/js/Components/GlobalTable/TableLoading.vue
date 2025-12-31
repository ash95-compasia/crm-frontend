<template>
  <div class="flex flex-col items-center justify-center p-12 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
    <div class="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin mb-4"></div>
    <p class="text-lg font-medium text-gray-900 mb-2">Loading Data</p>
    <p class="text-gray-600">Please wait while we load your data...</p>
    <div class="mt-6 flex space-x-2">
      <div class="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
      <div class="w-2 h-2 bg-green-600 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
      <div class="w-2 h-2 bg-green-600 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
    </div>
  </div>
</template>

<script setup>
// Loading component with no props needed
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>