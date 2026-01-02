<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
    <div class="flex items-center mb-6">
      <i class="ri-map-pin-user-line text-gray-400 dark:text-gray-300 mr-2"></i>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Correspondence Address</h2>
    </div>
    <div class="space-y-6">
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
        <textarea 
          v-model="localAddress" 
          rows="4" 
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
          id="address">
        </textarea>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
          <input 
            v-model="localCity" 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            id="city" />
        </div>
        <div>
          <label for="postalcode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Postcode</label>
          <input 
            v-model="localPostalcode" 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            id="postalcode" />
        </div>
        <div>
          <label for="state" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
          <select 
            v-model="localState" 
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            id="state">
            <option value="" class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">--- Select State ---</option>
            <option 
              v-for="item in listState" 
              :key="item.id" 
              :value="item.id"
              class="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-end">
        <button 
          @click="$emit('cust-update', getFormData())" 
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
          Save
        </button>
        <span v-if="sucessAddMsd" class="ml-4 text-green-600 dark:text-green-400">{{ sucessAddMsd }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CorrespondenceAddress',
  props: {
    address: String,
    postal_code: String,
    city: String,
    state: String,
    listState: Array,
    custId: String,
    sucessAddMsd: String
  },
  data() {
    return {
      localAddress: this.address || '',
      localPostalcode: this.postal_code || '',
      localCity: this.city || '',
      localState: this.state || ''
    };
  },
  watch: {
    address(val) { this.localAddress = val; },
    postalcode(val) { this.localPostalcode = val; },
    city(val) { this.localCity = val; },
    state(val) { this.localState = val; }
  },
  methods: {
    getFormData() {
      return {
        address: this.localAddress,
        postal_code: this.localPostalcode,
        city: this.localCity,
        state: this.localState
      };
    }
  },
  emits: ['cust-update']
};
</script>