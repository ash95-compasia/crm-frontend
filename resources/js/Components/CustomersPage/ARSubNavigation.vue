<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="-mb-px flex space-x-8" aria-label="AR Tabs">
        <button
          @click="$emit('set-sub-tab', 'collection')"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150',
            activeArTab === 'collection'
              ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
        >
          Collection Details
        </button>
        <button
          @click="$emit('set-sub-tab', 'invoices')"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150',
            activeArTab === 'invoices'
              ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
        >
          Invoices
        </button>
        <button
          @click="$emit('set-sub-tab', 'creditnotes')"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150',
            activeArTab === 'creditnotes'
              ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
        >
          Credit Notes
        </button>
        <button
          @click="$emit('set-sub-tab', 'soa')"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150',
            activeArTab === 'soa'
              ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
        >
          Statement of Account
        </button>
        <button
          @click="$emit('set-sub-tab', 'aging')"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150',
            activeArTab === 'aging'
              ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
        >
          Aging Report
        </button>
        <button
          @click="$emit('set-sub-tab', 'payments')"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150',
            activeArTab === 'payments'
              ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
        >
          List of Payment
        </button>
        <button
          @click="$emit('set-sub-tab','late-charges')"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150',
            activeArTab === 'late-charges'
              ? 'border-green-500 dark:border-green-400 text-green-600 dark:text-green-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
        >
          List of LPC
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ARSubNavigation',
  props: {
    activeArTab: String
  },
  emits: ['set-sub-tab']
};
</script>