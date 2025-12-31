<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Statuses</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stats.total || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
        <p class="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{{ stats.active || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive</p>
        <p class="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{{ stats.inactive || 0 }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Types Covered</p>
        <p class="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
          {{ stats.by_type ? Object.keys(stats.by_type).length : 0 }}
        </p>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex flex-wrap items-center gap-3">
        <button
          @click="$emit('open-modal', 'create')"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add New Status
        </button>

        <button
          v-if="selectedIds.length > 0"
          @click="$emit('bulk-activate')"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Activate Selected ({{ selectedIds.length }})
        </button>

        <button
          v-if="selectedIds.length > 0"
          @click="$emit('bulk-deactivate')"
          class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
        >
          Deactivate Selected ({{ selectedIds.length }})
        </button>

        <button
          v-if="selectedIds.length > 0"
          @click="$emit('bulk-delete')"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete Selected ({{ selectedIds.length }})
        </button>
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-4">
        <select
          v-model="localFilters.type"
          @change="$emit('filter')"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option v-for="t in types" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>

        <select
          v-model="localFilters.is_active"
          @change="$emit('filter')"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="true">Active Only</option>
          <option value="false">Inactive Only</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th class="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Color
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Default
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="status in filteredStatuses" :key="status.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :value="status.id"
                  v-model="selectedIds"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {{ status.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                {{ getTypeLabel(status.type) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getColorClasses(status.color)"
                >
                  {{ status.color }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span v-if="status.is_default" class="text-green-600 font-semibold">Default</span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="status.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'"
                >
                  {{ status.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="$emit('open-modal', 'edit', status)"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                >
                  Edit
                </button>
                <button
                  @click="$emit('delete', status)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="filteredStatuses.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                No statuses found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  configs: any[]
  types: { value: string; label: string }[]
  stats: any
  loading: boolean
  selectedIds: number[]  // Must match v-model:selected-ids → prop name: selectedIds
}>()

const emit = defineEmits<{
  (e: 'update:selectedIds', value: number[]): void
  (e: 'open-modal', mode: 'create' | 'edit', status?: any): void
  (e: 'delete', status: any): void
  (e: 'bulk-activate'): void
  (e: 'bulk-deactivate'): void
  (e: 'bulk-delete'): void
  (e: 'filter'): void
}>()

// Two-way binding for selectedIds
const selectedIds = computed({
  get: () => props.selectedIds ?? [],
  set: (val) => emit('update:selectedIds', val)
})

const localFilters = ref({
  type: '',
  is_active: ''
})

const selectAll = ref(false)

const filteredStatuses = computed(() => {
  let list = props.configs ?? []

  if (localFilters.value.type) {
    list = list.filter(s => s.type === localFilters.value.type)
  }

  if (localFilters.value.is_active !== '') {
    const active = localFilters.value.is_active === 'true'
    list = list.filter(s => s.is_active === active)
  }

  return list
})

const getTypeLabel = (type: string) => {
  const found = props.types.find(t => t.value === type)
  return found ? found.label : type.charAt(0).toUpperCase() + type.slice(1)
}

const getColorClasses = (color: string) => {
  const map: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
  return map[color] || map.gray
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedIds.value = filteredStatuses.value.map(s => s.id)
  } else {
    selectedIds.value = []
  }
}

// Keep selectAll in sync
watch(filteredStatuses, () => {
  selectAll.value = filteredStatuses.value.length > 0 &&
    filteredStatuses.value.every(s => selectedIds.value.includes(s.id))
}, { immediate: true })

watch(selectedIds, () => {
  selectAll.value = filteredStatuses.value.length > 0 &&
    filteredStatuses.value.every(s => selectedIds.value.includes(s.id))
})
</script>