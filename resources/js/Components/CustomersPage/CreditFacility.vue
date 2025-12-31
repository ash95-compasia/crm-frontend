<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
    <div class="flex items-center mb-6">
      <i class="ri-money-dollar-circle-line text-gray-400 dark:text-gray-300 mr-2"></i>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">CREDIT FACILITY</h2>
    </div>
    <div class="text-lg font-medium text-gray-900 dark:text-white">
      <i class="ri-subtract-fill text-gray-400 dark:text-gray-300 mr-2"></i>{{ customerLoan || 'N/A' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditFacility',
  props: {
    customerLoan: {
      type: String,
      default: ''
    }
  }
};
</script>