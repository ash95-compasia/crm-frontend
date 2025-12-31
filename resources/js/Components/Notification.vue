<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="visible"
      :class="[
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 z-50 border',
        type === 'success'
          ? 'bg-green-50 text-green-800 border-green-200'
          : 'bg-red-50 text-red-800 border-red-200'
      ]"
    >
      <div class="flex items-start">
        <svg
          v-if="type === 'success'"
          class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg
          v-else
          class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div class="flex-1">
          <p class="text-sm font-medium">{{ message }}</p>
        </div>
        <button
          @click="$emit('close')"
          class="ml-4 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: 'success'
  },
  visible: Boolean
});

defineEmits(['close']);
</script>