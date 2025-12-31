<template>
  <div class="space-y-6">
    <!-- Tax Config List -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Tax Configuration</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage different types of taxes and their rates
          </p>
        </div>
        <button
          @click="$emit('open-modal', 'create')"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Tax Type
        </button>
      </div>

      <!-- Tax Config Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <input
                  type="checkbox"
                  :checked="allSelected"
                  :indeterminate="someSelected && !allSelected"
                  @change="toggleAll"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                />
              </th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tax Type</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rate</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="tax in taxConfigs" :key="tax.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4">
                <input
                  type="checkbox"
                  :value="tax.id"
                  :checked="localSelected.includes(tax.id)"
                  @change="toggleSelection(tax.id)"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                />
              </td>
              <td class="py-3 px-4">
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ tax.type }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{{ getTaxTypeLabel(tax.type) }}</div>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ tax.percentage }}%
                </span>
              </td>
              <td class="py-3 px-4">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  tax.is_active
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                ]">
                  {{ tax.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm text-gray-900 dark:text-gray-300">
                  {{ formatDate(tax.updated_at) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  by {{ tax.updated_by || 'System' }}
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="flex space-x-2">
                  <button
                    @click="$emit('open-modal', 'edit', tax)"
                    class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 p-1 hover:bg-green-50 dark:hover:bg-gray-700 rounded"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="$emit('delete', tax)"
                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 p-1 hover:bg-red-50 dark:hover:bg-gray-700 rounded"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Bulk Actions -->
      <div v-if="localSelected.length > 0" class="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {{ localSelected.length }} tax configuration(s) selected
        </div>
        <div class="flex space-x-2">
          <button @click="$emit('bulk-activate')" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Activate
          </button>
          <button @click="$emit('bulk-deactivate')" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Deactivate
          </button>
          <button @click="$emit('bulk-delete')" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Summary Cards (same as before) -->
    <!-- ... rest of your summary cards ... -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  taxConfigs: any[]
  taxTypes: any[]
  activeTaxes: any[]
  stats: { total: number; active: number; inactive: number; average: string }
  loading?: boolean
  selectedIds: number[]  // from parent (v-model:selectedIds)
}>()

const emit = defineEmits([
  'open-modal',
  'delete',
  'bulk-activate',
  'bulk-deactivate',
  'bulk-delete',
  'update:selectedIds'
])

// Local copy - initialized once from props
const localSelected = ref<number[]>(props.selectedIds.slice())

// Only sync from parent → child when props change externally (e.g. clear selection from parent)
watch(
  () => props.selectedIds,
  (newVal) => {
    // Only update local if it's actually different (prevents loop)
    if (JSON.stringify(newVal.slice().sort()) !== JSON.stringify(localSelected.value.slice().sort())) {
      localSelected.value = newVal.slice()
    }
  },
  { immediate: false }  // don't run on mount if already synced
)

// When local changes (from user interaction), emit to parent
watch(
  localSelected,
  (newVal) => {
    emit('update:selectedIds', newVal.slice())  // emit copy to be safe
  },
  { deep: true }
)

// Select all logic
const allSelected = computed(() => {
  return props.taxConfigs.length > 0 && localSelected.value.length === props.taxConfigs.length
})

const someSelected = computed(() => localSelected.value.length > 0 && !allSelected.value)

const toggleAll = () => {
  if (allSelected.value) {
    localSelected.value = []
  } else {
    localSelected.value = props.taxConfigs.map(t => t.id)
  }
}

const toggleSelection = (id: number) => {
  const index = localSelected.value.indexOf(id)
  if (index === -1) {
    localSelected.value.push(id)
  } else {
    localSelected.value.splice(index, 1)
  }
  // No need to manually emit - the watcher above will handle it
}

// Helper functions
const getTaxTypeLabel = (type: string) => {
  const found = props.taxTypes.find(t => t.value === type)
  return found ? found.label : type
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6
}
</style>