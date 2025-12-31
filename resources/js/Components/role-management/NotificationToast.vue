<!-- components/role-management/NotificationToast.vue -->
<template>
  <div
    v-if="message"
    :class="[
      'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm border text-sm z-50 transition-all duration-300',
      type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
    ]"
  >
    <div class="flex items-center gap-3">
      <svg v-if="type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="flex-1">{{ message }}</span>
      <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: String,
  type: { type: String, default: 'success' }
})

defineEmits(['close'])
</script>