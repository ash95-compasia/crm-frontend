<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-8">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <router-link 
          :to="`/customer-data/${customerId}?tab=summary`" 
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          :class="isActiveTab('summary') ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          <i class="ri-information-line text-muted align-bottom me-1"></i>
          Summary
        </router-link>
        <router-link 
          :to="`/customer-data/${customerId}?tab=orders`"
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          :class="isActiveTab('orders') ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          <i class="ri-shopping-cart-2-line text-muted align-bottom me-1"></i>
          Orders
        </router-link>
        <router-link 
          :to="`/customer-data/${customerId}?tab=contracts`"
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          :class="isActiveTab('contracts') ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          <i class="ri-file-edit-line text-muted align-bottom me-1"></i>
          Contracts
        </router-link>
        <router-link 
          :to="`/customer-data/${customerId}?tab=ar&subtab=soa`"
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          :class="isActiveTab('ar') ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          <i class="ri-checkbox-multiple-line text-muted align-bottom me-1"></i>
          AR
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationTabs',
  props: {
    activeTab: String,
    isActiveTab: Function,
    customerId: String
  }
};
</script>