<template>
  <div class="space-y-6">
    <!-- Prefix Config List -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Prefix Configuration</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Configure number prefixes for orders, invoices, contracts, and more
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="$emit('refresh')"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors flex items-center text-sm"
            title="Refresh"
            :disabled="loading"
          >
            <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
          <button
            @click="$emit('open-modal', 'create')"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Prefix
          </button>
        </div>
      </div>
      
      <!-- Filter and Search -->
      <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
          <select
            v-model="filters.type"
            @change="$emit('filter')"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option v-for="type in prefixTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
          <select
            v-model="filters.year"
            @change="$emit('filter')"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">All Years</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Month</label>
          <select
            v-model="filters.month"
            @change="$emit('filter')"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">All Months</option>
            <option v-for="month in months" :key="month.value" :value="month.value">
              {{ month.label }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
          <select
            v-model="filters.is_active"
            @change="$emit('filter')"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>
      <!-- Prefix Config Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prefix</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Next Number</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Format</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Period</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Auto Reset</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="config in configs" :key="config.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4">
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ getPrefixTypeLabel(config.type) }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ config.type }}
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <code class="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {{ config.prefix }}
                </code>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ config.next_number }}
                  </span>
                  <button
                    @click="$emit('increment', config)"
                    class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                    title="Increment"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </button>
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ config.format }}
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ config.year }}-{{ config.month.toString().padStart(2, '0') }}
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="flex flex-col space-y-1">
                  <span v-if="config.reset_yearly" class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                    Yearly
                  </span>
                  <span v-if="config.reset_monthly" class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                    Monthly
                  </span>
                  <span v-if="!config.reset_yearly && !config.reset_monthly" class="text-xs text-gray-500 dark:text-gray-400">
                    Never
                  </span>
                </div>
              </td>
              <td class="py-3 px-4">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  config.is_active
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                ]">
                  {{ config.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex space-x-2">
                  <button
                    @click="$emit('open-modal', 'edit', config)"
                    class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 p-1 hover:bg-green-50 dark:hover:bg-gray-700 rounded"
                    title="Edit configuration"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="$emit('test', config)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 p-1 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"
                    title="Test number generation"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <button
                    @click="$emit('duplicate', config)"
                    class="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200 p-1 hover:bg-purple-50 dark:hover:bg-gray-700 rounded"
                    title="Duplicate configuration"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button
                    @click="$emit('delete', config)"
                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200 p-1 hover:bg-red-50 dark:hover:bg-gray-700 rounded"
                    title="Delete configuration"
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
      <!-- Empty State -->
      <div v-if="configs.length === 0" class="text-center py-8">
        <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="mt-4 text-gray-500 dark:text-gray-400">No prefix configurations found</p>
        <button
          @click="$emit('open-modal', 'create')"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Create First Prefix Configuration
        </button>
      </div>
    </div>
    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Active Configurations -->
      <div class="card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Active Configurations</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ stats.active }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ stats.total }} total configurations
            </p>
          </div>
        </div>
      </div>
      <!-- Next Numbers Summary -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Next Numbers</h3>
        <div class="space-y-2">
          <div v-for="(next, type) in nextNumbers" :key="type" class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ getPrefixTypeLabel(type) }}</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ next }}</span>
          </div>
        </div>
      </div>
      <!-- Reset Settings -->
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Auto Reset Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Monthly Reset</span>
            <span class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ stats.monthlyReset }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Yearly Reset</span>
            <span class="text-sm font-medium text-yellow-600 dark:text-yellow-400">{{ stats.yearlyReset }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">No Auto Reset</span>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ stats.noReset }}</span>
          </div>
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Auto reset ensures numbering starts fresh each period
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  configs: any[]
  filters: any
  prefixTypes: Array<{ value: string; label: string }>
  years: number[]
  months: any[]
  stats: any
  nextNumbers: any
  loading: boolean
}>()

defineEmits(['open-modal', 'refresh', 'filter', 'increment', 'test', 'duplicate', 'delete'])

const getPrefixTypeLabel = (type: any) => {
  const typeObj = props.prefixTypes.find(t => t.value === type)
  return typeObj ? typeObj.label : type
}
</script>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6
}
</style>