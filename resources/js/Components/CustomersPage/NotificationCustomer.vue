<template>
  <div 
    v-if="notification.message" 
    :class="[
      'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 z-50 border',
      notification.type === 'success' 
        ? 'bg-green-50 text-green-800 border-green-200' 
        : 'bg-red-50 text-red-800 border-red-200'
    ]"
  >
    <div class="flex items-center">
      <svg 
        v-if="notification.type === 'success'" 
        class="w-5 h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <svg 
        v-else 
        class="w-5 h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span class="text-sm">{{ notification.message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    notification: Object
  }
};
</script>