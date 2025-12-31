<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-6">Collection Details</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Monthly Payable Amount (RM)</div>
        <div class="mt-1 text-2xl font-bold text-gray-900">{{ formatCurrency(monthlyPayableAmount) }}</div>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Late Payment Charge (RM)</div>
        <div class="mt-1 text-2xl font-bold text-gray-900">{{ formatCurrency(totalLatePaymentCharge) }}</div>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm font-medium text-gray-500 uppercase tracking-wide">Collection Date</div>
        <div class="mt-1 text-2xl font-bold text-gray-900">{{ collectionDate }}</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <div class="text-sm font-medium text-green-600 uppercase tracking-wide">No. of Successful Collection</div>
        <div class="mt-1 text-2xl font-bold text-green-800">{{ noSuccessfulCollections }}</div>
      </div>
      <div class="bg-red-50 p-4 rounded-lg">
        <div class="text-sm font-medium text-red-600 uppercase tracking-wide">No. of Failed Collection</div>
        <div class="mt-1 text-2xl font-bold text-red-800">{{ noFailedCollections }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionDetails',
  props: {
    monthlyPayableAmount: Number,
    totalLatePaymentCharge: Number,
    collectionDate: String,
    noSuccessfulCollections: Number,
    noFailedCollections: Number,
    formatCurrency: Function
  }
};
</script>