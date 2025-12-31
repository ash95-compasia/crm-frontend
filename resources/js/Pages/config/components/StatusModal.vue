<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-4 my-8">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ mode === 'create' ? 'Add New Status' : 'Edit Status' }}
        </h3>
        <button
          @click="$emit('update:visible', false)"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6">
        <form @submit.prevent="$emit('save')">
          <div class="space-y-5">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="localForm.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Paid, Pending, Cancelled"
              />
              <p v-for="err in errors.name" :key="err" class="mt-1 text-sm text-red-600">{{ err }}</p>
            </div>

            <!-- Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type <span class="text-red-500">*</span>
              </label>
              <select
                v-model="localForm.type"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a type</option>
                <option v-for="t in statusTypes" :key="t.value" :value="t.value">
                  {{ t.label }}
                </option>
              </select>
              <p v-for="err in errors.type" :key="err" class="mt-1 text-sm text-red-600">{{ err }}</p>
            </div>

            <!-- Color -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Color
              </label>
              <select
                v-model="localForm.color"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
                <option value="indigo">Indigo</option>
                <option value="gray">Gray</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                v-model="localForm.description"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of when this status is used"
              ></textarea>
            </div>

            <!-- Toggles -->
            <div class="flex flex-wrap gap-6">
              <label class="flex items-center">
                <input
                  v-model="localForm.is_active"
                  type="checkbox"
                  class="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
              </label>

              <label class="flex items-center">
                <input
                  v-model="localForm.is_default"
                  type="checkbox"
                  class="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Set as Default for this Type
                </span>
              </label>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 mt-8">
            <button
              type="button"
              @click="$emit('update:visible', false)"
              class="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {{ submitting ? 'Saving...' : (mode === 'create' ? 'Create Status' : 'Update Status') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  visible: boolean
  mode: 'create' | 'edit'
  form: any
  statusTypes: { value: string; label: string }[]
  errors: Record<string, string[]>
  submitting: boolean
}>()

const emit = defineEmits(['update:visible', 'save'])

const localForm = computed({
  get: () => props.form,
  set: (val) => {} // Not needed — parent owns the form
})
</script>