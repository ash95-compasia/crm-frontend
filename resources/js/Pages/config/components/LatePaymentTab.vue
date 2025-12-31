<template>
  <div class="card">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Late Payment Configuration</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Configure settings for late payment charges and grace periods
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <span :class="[
          'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
          config.is_active
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        ]">
          {{ config.is_active ? 'Active' : 'Inactive' }}
        </span>
      </div>
    </div>
    <form @submit.prevent="$emit('save')" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Charge Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Charge Amount (Per Cycle) *
          </label>
          <div class="relative">
            <input
              type="number"
              v-model="config.min_charge_amount"
              step="0.0001"
              min="0"
              max="100"
              required
              class="w-full pl-12 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
              placeholder="10"
              :disabled="submitting"
            />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <span class="text-gray-500 dark:text-gray-400">$</span>
            </div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Daily interest applied to overdue amounts
          </p>
          <div v-if="errors.min_charge_amount" class="text-red-500 text-xs mt-1">{{ errors.min_charge_amount[0] }}</div>
        </div>
        <!-- Grace Period Days -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Grace Period (Days) *
          </label>
          <input
            type="number"
            v-model="config.grace_period_days"
            min="0"
            max="30"
            required
            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            placeholder="0"
            :disabled="submitting"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Number of days before late charges apply
          </p>
          <div v-if="errors.grace_period_days" class="text-red-500 text-xs mt-1">{{ errors.grace_period_days[0] }}</div>
        </div>
        <!-- Frequency Days -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Charge Frequency (Days) *
          </label>
          <input
            type="number"
            v-model="config.frequency_days"
            min="1"
            max="365"
            required
            class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            placeholder="30"
            :disabled="submitting"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            How often late charges are calculated
          </p>
          <div v-if="errors.frequency_days" class="text-red-500 text-xs mt-1">{{ errors.frequency_days[0] }}</div>
        </div>
      </div>
      <!-- Status Toggle -->
      <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Configuration Status
            </label>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Enable or disable late payment charges
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="config.is_active"
              class="sr-only peer"
              :disabled="submitting"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <!-- Form Actions -->
      <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          @click="$emit('reset')"
          :disabled="submitting"
          class="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
        >
          Reset
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
          {{ submitting ? 'Saving...' : 'Save Configuration' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  config: any
  loading: boolean
  submitting: boolean
  errors: Record<string, string[]>
}>()
defineEmits(['save', 'reset'])
</script>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6
}
</style>