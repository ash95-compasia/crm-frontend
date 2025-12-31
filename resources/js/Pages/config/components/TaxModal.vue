<template>
  <transition name="modal">
    <div v-if="visible" class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 transition-opacity z-50">
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full p-4">
          <transition name="modal-content">
            <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <!-- Modal Header -->
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ mode === 'create' ? 'Add New Tax Type' : 'Edit Tax Configuration' }}
                </h3>
                <button
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <!-- Tax Form -->
              <form @submit.prevent="$emit('save')" class="space-y-4">
                <!-- Tax Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax Type *
                  </label>
                  <select
                    v-model="form.type"
                    required
                    class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                    :disabled="submitting"
                  >
                    <option value="">Select Tax Type</option>
                    <option v-for="type in taxTypes" :key="type.value" :value="type.value">
                      {{ type.label }}
                    </option>
                  </select>
                  <div v-if="errors.type" class="text-red-500 text-xs mt-1">{{ errors.type[0] }}</div>
                </div>
                <!-- Percentage -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax Rate (%) *
                  </label>
                  <div class="relative">
                    <input
                      type="number"
                      v-model="form.percentage"
                      required
                      step="0.01"
                      min="0"
                      max="100"
                      class="w-full pl-12 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                      placeholder="0.00"
                      :disabled="submitting"
                    />
                    <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <span class="text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>
                  <div v-if="errors.percentage" class="text-red-500 text-xs mt-1">{{ errors.percentage[0] }}</div>
                </div>
                <!-- Status -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status *
                  </label>
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="form.is_active"
                        :value="true"
                        required
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        :disabled="submitting"
                      />
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="form.is_active"
                        :value="false"
                        required
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        :disabled="submitting"
                      />
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                    </label>
                  </div>
                  <div v-if="errors.is_active" class="text-red-500 text-xs mt-1">{{ errors.is_active[0] }}</div>
                </div>
                <!-- Form Actions -->
                <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    @click="closeModal"
                    :disabled="submitting"
                    class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="submitting"
                    :class="[
                      'px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center text-white',
                      submitting
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    ]"
                  >
                    <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ submitting ? 'Saving...' : (mode === 'create' ? 'Add Tax Type' : 'Update Configuration') }}
                  </button>
                </div>
              </form>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  mode: 'create' | 'edit'
  form: any
  taxTypes?: any[]          // only for TaxModal
  years?: number[]
  months?: any[]
  errors: Record<string, string[]>
  preview?: string
  showPreview?: boolean
  submitting: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'save'): void
  (e: 'close'): void
}>()

// Helper to close the modal
const closeModal = () => {
  emit('update:visible', false)
  emit('close')
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-content-enter-active, .modal-content-leave-active {
  transition: all 0.3s ease;
}
.modal-content-enter-from, .modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>